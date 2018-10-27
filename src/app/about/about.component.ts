import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  submitted = false;
  registerFormGroup: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder) { }

  private scriptURL = 'https://script.google.com/macros/s/AKfycbxFNLTWjBgRoS6TATor0jIOXm3a4XkSsBpdeKTZRE8tmElepek/exec';
  private registerForm = document.forms['registerForm'];

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);

    this.registerFormGroup = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('hello');

    fetch(this.scriptURL, { method: 'POST', body: new FormData(this.registerForm)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message));
  }
}
