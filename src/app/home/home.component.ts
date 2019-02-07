import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  registerFormGroup: FormGroup;
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
  }
}
