import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActiveFeaturesThemes, ActiveTemplates } from '../../../builder';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-features-colour-picker',
  templateUrl: './features-colour-picker.component.html'
})
export class FeaturesColourPickerComponent implements OnInit, OnDestroy {
  featuresThemes: any;
  defaultFeaturesStyle: any;
  featuresStyle: any;
  featuresHeaderStyle: any = {'color': '#000'};
  featuresSubheaderStyle: any = {'color': '#000'};
  featuresTemplate: string = ActiveTemplates.Default;
  featuresTheme: string = ActiveFeaturesThemes.Default;
  websiteChangeCount: number;
  activeComponentId: string;

  private featureStyleSubscription: Subscription;
  private featureHeaderStyleSubscription: Subscription;
  private featureSubheaderStyleSubscription: Subscription;
  private featuresThemesSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private activeComponentIdSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {

    this.activeComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeComponentId = response;
      }
    });

    this.builderFeaturesService.postMessage('get-feature', this.activeComponentId, 'feature-subheader-style-color');

    this.featureStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      if (response) {
        this.featuresStyle = response;
      }
    });

    this.featureHeaderStyleSubscription = this.builderFeaturesService.featuresHeaderStyle.subscribe(response => {
      if (response) {
        this.featuresHeaderStyle = response;
      }
    });

    this.featureSubheaderStyleSubscription = this.builderFeaturesService.featuresSubheaderStyle.subscribe(response => {
      if (response) {
        this.featuresSubheaderStyle = response;
      }
    });

    this.featuresThemesSubscription = this.builderFeaturesService.getFeaturesThemes().subscribe(response => {
      if (response) {
        this.featuresThemes = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(response => {
      if (response) {
        this.featuresTemplate = response;

        this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(style => {
          if (style) {
            this.defaultFeaturesStyle = style;
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.featuresTheme === ActiveFeaturesThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderFeaturesService.featuresTheme.next(this.featuresTheme);
      this.builderFeaturesService.setFeaturesTheme(this.featuresTheme, this.activeComponentId);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesStyle() {
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeaderStyle() {
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheaderStyle() {
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    const id = this.activeComponentId;
    this.builderFeaturesService.featuresTheme.next(ActiveFeaturesThemes.Default);
    this.featuresStyle['background-color'] = this.defaultFeaturesStyle['featuresStyle']['background-color'];
    this.featuresHeaderStyle['color'] = this.defaultFeaturesStyle['featuresHeaderStyle']['color'];
    this.featuresSubheaderStyle['color'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['color'];
    this.setFeaturesStyle();
    this.setFeaturesHeaderStyle();
    this.setFeaturesSubheaderStyle();
  }

  clearCurrentSettings(): void {
    this.activeComponentId = null;
    this.featuresHeaderStyle = null;
    this.featuresSubheaderStyle = null;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if ((e.data.action == 'unique-component-selected' || e.data.action == 'duplicate-component-deselected') && this.activeComponentId) {
        this.clearCurrentSettings();
      }
    }
  }

  ngOnDestroy(): void {
    this.featuresThemesSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    if (this.defaultFeaturesStyleSubscription && !this.defaultFeaturesStyleSubscription.closed) {this.defaultFeaturesStyleSubscription.unsubscribe(); }
    this.websiteChangeCountSubscription.unsubscribe();
    this.activeComponentIdSubscription.unsubscribe();
    this.featureHeaderStyleSubscription.unsubscribe();
    this.featureSubheaderStyleSubscription.unsubscribe();
  }
}
