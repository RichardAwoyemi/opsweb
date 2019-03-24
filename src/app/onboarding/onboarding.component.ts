import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor() { }

  ngOnInit() {
  }
}
