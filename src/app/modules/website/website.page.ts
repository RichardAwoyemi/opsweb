import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../../shared/services/router.service';
import { BuilderService } from '../builder/builder.service';
import { AuthService } from '../auth/auth.service';
import { WebsiteService } from '../../shared/services/website.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.css']
})
export class WebsiteComponent implements OnInit, AfterViewChecked, OnDestroy {
  innerHeight: number;
  websiteId: string;

  ngUnsubscribe = new Subject<void>();

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
    this.websiteService.websiteId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
