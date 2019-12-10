import { AfterViewInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../builder.service';
import { BuilderShowcaseLayoutComponent } from './builder-showcase-layout/builder-showcase-layout.component';
import { BuilderShowcaseService } from './builder-showcase.service';
import { ActiveComponents, ActiveElements, ActiveSettings } from '../builder';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./builder-showcase.component.css']
})
export class BuilderShowcaseComponent implements OnInit, AfterViewInit {
  innerHeight: number;
  document: any;
  componentReference: any;
  showcaseHeight: number = 122;
  iframeHolderHeight: number = 184;
  iframeHeight: number = 180;
  activeShowcaseOrientation: string;
  private activeOrientationSubscription: Subscription;
  private previewModeSubscription: Subscription;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;

  constructor(
    private builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.activeOrientationSubscription = this.builderService.activeOrientation.subscribe((response => {
      if (response) {
        this.activeShowcaseOrientation = response;
      }
    }));

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      if (response) {
        this.showcaseHeight = 74;
        this.iframeHolderHeight = 132;
        this.iframeHeight = 128;
      } else {
        this.showcaseHeight = 122;
        this.iframeHolderHeight = 184;
        this.iframeHeight = 180;
      }
    });
  }

  ngAfterViewInit() {
    this.document = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    BuilderShowcaseService.loadIframeCss(this.document, 'assets/css/page.min.css');
    BuilderShowcaseService.loadIframeCss(this.document, 'assets/css/themify.css');
    BuilderShowcaseService.loadIframeCss(this.document, 'assets/css/builder.css');
    BuilderShowcaseService.loadIframeJs(this.document, 'https://code.jquery.com/jquery-3.4.1.min.js');
    BuilderShowcaseService.loadIframeJs(this.document, 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
    BuilderShowcaseService.loadIframeJs(this.document, 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
    BuilderShowcaseService.loadIframeCss(this.document, 'https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css');
    BuilderShowcaseService.loadIframeJs(this.document, 'https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js');
    BuilderShowcaseService.loadIframeJs(this.document, 'https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js');
    BuilderShowcaseService.loadIframeJs(this.document, 'assets/js/iframe.js');

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BuilderShowcaseLayoutComponent);
    this.componentReference = this.viewContainerRef.createComponent(componentFactory);
    this.componentReference.changeDetectorRef.detectChanges();
    this.document.body.appendChild(this.componentReference.location.nativeElement);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditSetting.next(ActiveSettings.Components);
    this.builderService.activeElement.next(ActiveElements.Default);
    window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-deselected' }, '*');
    this.builderService.setSidebarComponentsSetting();
  }
}
