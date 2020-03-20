import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../../shared/services/router.service';
import { BuilderService } from '../builder/builder.service';
import { IframeService } from '../../shared/iframe.service';
import { WebsiteLayoutComponent } from './website-layout/website-layout.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WebsiteComponent implements OnInit, AfterViewInit {
  @ViewChild('iframe', {static: false}) iframe: ElementRef;
  document: any;
  componentReference: any;
  innerHeight: number;

  constructor(
    public router: Router,
    private routerService: RouterService,
    private authService: AuthService,
    private builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.builderService.websiteMode.next(true);
    this.builderService.previewMode.next(true);
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  ngAfterViewInit() {
    this.document = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    IframeService.loadIframeCss(this.document, 'assets/css/page.min.css');
    IframeService.loadIframeCss(this.document, 'assets/css/themify.css');
    IframeService.loadIframeCss(this.document, 'assets/css/website.css');
    IframeService.loadIframeJs(this.document, 'https://code.jquery.com/jquery-3.4.1.min.js');
    IframeService.loadIframeJs(this.document, 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
    IframeService.loadIframeJs(this.document, 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
    IframeService.loadIframeJs(this.document, 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WebsiteLayoutComponent);
    this.componentReference = this.viewContainerRef.createComponent(componentFactory);
    this.componentReference.changeDetectorRef.detectChanges();
    this.document.body.appendChild(this.componentReference.location.nativeElement);
  }

  calculateIframeStyle() {
    if (this.authService.isLoggedIn()) {
      return {'height': innerHeight - 30 + 'px'};
    } else {
      return {'height': innerHeight + 'px'};
    }
  }
}
