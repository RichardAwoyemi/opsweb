import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  registerFormGroup: FormGroup;
  submitted = false;
  closeResult: string;

  @ViewChild('errorModal') errorModal: ElementRef;
  registerForm = document.forms['registerForm'];

  private scriptURL = 'https://script.google.com/macros/s/AKfycbxFNLTWjBgRoS6TATor0jIOXm3a4XkSsBpdeKTZRE8tmElepek/exec';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
    this.registerFormGroup = new FormGroup({
      email: new FormControl()
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
      modalReference.componentInstance.header = 'Oops!';
      modalReference.componentInstance.message = 'Please ensure that have entered your email address correctly.';
      return;
    }

    const formObject = document.forms['registerForm'];

    if (environment.production === false) {
      console.log(new FormData(formObject));
    }

    fetch(this.scriptURL, { method: 'POST', body: new FormData(formObject) })
      .then(response => {
        if (environment.production === false) {
          console.log('Success!', response);
        }
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Yay!';
        modalReference.componentInstance.message = 'Thanks for signing up. We will be in touch.';
        this.submitted = true;
      })
      .catch(
        error => {
          if (environment.production === false) {
            console.error('Error!', error.message);
          }
          const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
          modalReference.componentInstance.header = 'Oops!';
          modalReference.componentInstance.message = 'Something has gone wrong. Please try again.';
          this.submitted = true;
        });
  }
}
