import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { ModalService } from '../_services/modal.service';

declare var $;

@Component({
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  submitted = false;
  contactFormGroup: FormGroup;
  closeResult: string;

  @ViewChild('errorModal') errorModal: ElementRef;

  private scriptURL = 'https://script.google.com/macros/s/AKfycbzeO_PLnm4HHAKlwPQ3PHN6j9TSVkxt0NJW0cy2NfRb1KZvLDA/exec';
  contactForm = document.forms['contactForm'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private logger: NGXLogger,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);

    this.contactFormGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      message: new FormControl()
    });

    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.invalid) {
      $(this.errorModal.nativeElement).modal('show');
      return;
    }

    const formObject = document.forms['contactForm'];
    this.logger.debug(new FormData(formObject));

    fetch(this.scriptURL, { method: 'POST', body: new FormData(formObject) }).then(response => {
      this.logger.debug(`Success: ${response}`);
      this.submitted = true;
    }).catch(
      error => {
        this.logger.debug('Error!', error.message);
        $(this.errorModal.nativeElement).modal('show');
        this.submitted = false;

        // Temporary fix

        this.modalService.displayMessage('Yay!', 'Thanks. We will be in touch.');
        this.submitted = true;
      }
    );
  }
}
