import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var $;

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  submitted = false;
  registerFormGroup: FormGroup;
  closeResult: string;

  @ViewChild('errorModal') errorModal: ElementRef;

  private scriptURL = 'https://script.google.com/macros/s/AKfycbxFNLTWjBgRoS6TATor0jIOXm3a4XkSsBpdeKTZRE8tmElepek/exec';
  registerForm = document.forms['registerForm'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);

    this.registerFormGroup = new FormGroup({
      email: new FormControl()
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      $(this.errorModal.nativeElement).modal('show');
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
        this.submitted = true;
      })
      .catch(
        error => {
          if (environment.production === false) {
            console.error('Error!', error.message);
          }
          $(this.errorModal.nativeElement).modal('show');
          this.submitted = false;
        });
  }
}
