import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { IframeService } from '../../../shared/services/iframe.service';
import { ActiveComponents, ActiveElements, ActiveSettings } from '../builder';
import { BuilderService } from '../builder.service';
import { BuilderShowcaseLayoutComponent } from './builder-showcase-layout/builder-showcase-layout.component';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./builder-showcase.component.css']
})
export class BuilderShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  innerHeight: number;
  document: any;
  componentReference: any;
  showcaseHeight = 122;
  iframeHolderHeight = 184;
  iframeHeight = 180;
  activeShowcaseOrientation: string;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.builderService.activeOrientation.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response => {
        if (response) {
          this.activeShowcaseOrientation = response;
        }
      }));

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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
    IframeService.loadIframeCss(this.document, 'assets/css/page.css');
    IframeService.loadIframeCss(this.document, 'assets/css/themify.css');
    IframeService.loadIframeCss(this.document, 'assets/css/website.css');
    IframeService.loadIframeCss(this.document, 'assets/css/builder.css');
    IframeService.loadIframeCss(this.document, 'assets/css/fonts.css');
    IframeService.loadIframeJs(this.document, 'assets/js/page.min.js');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BuilderShowcaseLayoutComponent);
    this.componentReference = this.viewContainerRef.createComponent(componentFactory);
    this.componentReference.changeDetectorRef.detectChanges();
    this.document.body.appendChild(this.componentReference.location.nativeElement);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(null);
    this.builderService.activeEditSetting.next(ActiveSettings.Components);
    this.builderService.activeElement.next(ActiveElements.Default);
    window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-deselected' }, '*');
    window.postMessage({ 'for': 'opsonion', 'action': 'deselect-text', }, '*');
    this.builderService.setSidebarComponentsSetting();
  }
}
