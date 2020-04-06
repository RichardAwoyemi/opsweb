import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.css']
})
export class WebsiteHeaderComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  id: string;
  websiteName: string;

  private websiteNameSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private websiteService: WebsiteService,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    this.websiteNameSubscription = this.websiteService.websiteName.subscribe(response => {
      if (response) {
        this.websiteName = `${response}.opsonion.com`;
      }
    });
  }

  redirectToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
    });
  }

  redirectToBuilder() {
    this.router.navigate(['builder', this.id]).then(() => {
    });
  }

  ngOnDestroy() {
    this.websiteNameSubscription.unsubscribe();
  }

  redirectToWebsite() {
    window.open('https://www.google.com', '_blank');
    window.focus();
  }
}
