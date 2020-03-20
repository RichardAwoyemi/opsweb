import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';

@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.css']
})
export class WebsiteHeaderComponent implements OnInit, OnDestroy {
  id: string;
  websiteName: string;

  private websiteNameSubscription: Subscription;

  constructor(
    public router: Router,
    private websiteService: WebsiteService,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
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
