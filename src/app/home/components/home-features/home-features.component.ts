import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';

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
      'title': 'Quality',
      'description': 'We blend research, design and technology to create enterprise grade products.',
      'image': 'assets/img/quality.svg',
      'delay': 0
    },
    {
      'title': 'Efficiency',
      'description': 'We reduce developement times for quality products using automated pipelines.',
      'image': 'assets/img/efficiency.svg',
      'delay': 1000
    },
    {
      'title': 'Affordability',
      'description': 'We maintain reasonable prices by leveraging the benefits of our streamlined processes.',
      'image': 'assets/img/affordability.svg',
      'delay': 2000
    }
  ];
  employerFeaturesHeading = 'Need something done?';
  employerFeaturesSubheading = 'Simply post a task and we will help you build, run and scale your idea:';
  employerFeatures = [
    'Use our library components to speed up product creation;',
    'Chat with us to get constant progress updates; and',
    'Work out a payment schedule that suits you.'
  ];
  employeeFeaturesButtonText = 'Get started';
  employeeFeaturesImage = '../assets/img/support.svg';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public utilService: UtilService
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
