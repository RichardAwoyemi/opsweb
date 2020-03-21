import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../../shared/services/router.service';
import { BuilderService } from '../builder/builder.service';
import { AuthService } from '../auth/auth.service';
import { WebsiteService } from '../../shared/services/website.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.css']
})
export class WebsiteComponent implements OnInit, AfterViewChecked {
  @ViewChild('iframe', {static: false}) iframe: ElementRef;
  document: any;
  innerHeight: number;
  websiteId: string;

  private websiteIdSubscription: Subscription;

  constructor(
    public router: Router,
    private routerService: RouterService,
    private authService: AuthService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private viewContainerRef: ViewContainerRef,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.builderService.websiteMode.next(true);
    this.builderService.previewMode.next(true);
    this.websiteIdSubscription = this.websiteService.websiteId.subscribe(response => {
      if (response) {
        this.websiteId = response;
      }
    });
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
