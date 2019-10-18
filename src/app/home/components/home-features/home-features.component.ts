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
      'title': 'Build',
      'description': 'Create production-ready experiences without writing a single line of code.',
      'image': 'assets/img/build.svg',
      'delay': 0
    },
    {
      'title': 'Deploy',
      'description': 'Get your application published with a single click onto our fast hosting network.',
      'image': 'assets/img/deploy.svg',
      'delay': 1000
    },
    {
      'title': 'Scale',
      'description': 'Quickly iterate to meet demand without worrying about maintenance.',
      'image': 'assets/img/scale.svg',
      'delay': 2000
    }
  ];
  secondaryFeaturesHeading = 'Bring your ideas to life';
  secondaryFeaturesSubheading = 'Our platform gives you what you need, right out of the box:';
  secondaryFeatures = [
    'Tools made with the non-coder in mind;',
    'Templates designed to fast-track workflow;',
    'Data and external integrations made easy.',
  ];
  secondaryFeaturesButtonText = 'Get Started';

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
