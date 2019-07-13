import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-features',
  templateUrl: './home-features.component.html'
})
export class HomeFeaturesComponent implements OnInit {
  featureCardColumnWidth$: Observable<string>;
  columnWidth$: Observable<string>;
  isMobile: Observable<BreakpointState>;
  features = [
    {
      'title': 'Better Talent',
      'description': 'Easily find the perfect candidate that will bring your latest project to life.',
      'image': 'assets/img/talent.svg',
      'delay': 0
    },
    {
      'title': 'Better Products',
      'description': 'All of our workers have been vetted so they are guaranteed to deliver amazing work.',
      'image': 'assets/img/products.svg',
      'delay': 1000
    },
    {
      'title': 'Better Support',
      'description': 'We always consult chosen talent on the platform to help resolve disputes.',
      'image': 'assets/img/support.svg',
      'delay': 2000
    }
  ];
  employerFeaturesHeading = 'Need something done?';
  employerFeaturesSubheading = 'Getting started is easy! Simply register, post a task and automatically ' +
  'get matched to vetted talent in no time:';
  employerFeatures = [
    'Use templates to speed up product creation;',
    'Chat with workers to get constant progress updates; and',
    'Pay upon completion when you\'re 100% satisfied.'
  ];
  employeeFeaturesButtonText = 'Get started';
  employeeFeaturesImage = '../assets/img/match.svg';

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.featureCardColumnWidth$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? 'col-lg-4' : 'col-md-12')
    );
    this.columnWidth$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? 'col-md-6 ml-auto' : 'col-md-12 mx-auto')
    );
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }
}
