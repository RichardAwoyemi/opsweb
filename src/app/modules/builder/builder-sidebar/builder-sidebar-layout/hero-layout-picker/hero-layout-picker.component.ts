import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-hero-layout-picker',
  templateUrl: './hero-layout-picker.component.html'
})
export class HeroLayoutPickerComponent implements OnInit, OnDestroy {
  heroComponentLayout: any = { 'layout': 0 };
  heroTemplate: string = ActiveTemplates.Default;
  heroHeadingStyle: any;
  defaultHeroStyle: any;
  heroSubheadingStyle: any;
  heroHeadingPaddingTop: number;
  heroHeadingPaddingLeft: number;
  heroHeadingPaddingRight: number;
  heroHeadingPaddingBottom: number;
  heroSubheadingPaddingTop: number;
  heroSubheadingPaddingLeft: number;
  heroSubheadingPaddingRight: number;
  heroSubheadingPaddingBottom: number;

  private heroComponentLayoutSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private defaultHeroStyleSubscription: Subscription;
  private heroTemplateSubscription: Subscription;

  constructor(
    private builderHeroService: BuilderHeroService
  ) {
  }

  ngOnInit() {
    this.heroComponentLayoutSubscription = this.builderHeroService.heroComponentLayout.subscribe(response => {
      if (response) {
        this.heroComponentLayout = response;
      }
    });

    this.heroTemplateSubscription = this.builderHeroService.heroTemplate.subscribe(response => {
      if (response) {
        this.heroTemplate = response;

        this.defaultHeroStyleSubscription = this.builderHeroService.getDefaultHeroStyle(this.heroTemplate).subscribe(response => {
          if (response) {
            this.defaultHeroStyle = response;
          }
        });
      }
    });

    this.heroHeadingStyleSubscription = this.builderHeroService.heroHeadingStyle.subscribe(response => {
      if (response) {
        this.heroHeadingStyle = response;
        if (this.heroHeadingStyle['padding-top']) {
          this.heroHeadingPaddingTop = this.heroHeadingStyle['padding-top'].replace('px', '');
        }
        if (this.heroHeadingStyle['padding-left']) {
          this.heroHeadingPaddingLeft = this.heroHeadingStyle['padding-left'].replace('px', '');
        }
        if (this.heroHeadingStyle['padding-right']) {
          this.heroHeadingPaddingRight = this.heroHeadingStyle['padding-right'].replace('px', '');
        }
        if (this.heroHeadingStyle['padding-bottom']) {
          this.heroHeadingPaddingBottom = this.heroHeadingStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.heroSubheadingStyleSubscription = this.builderHeroService.heroSubheadingStyle.subscribe(response => {
      if (response) {
        this.heroSubheadingStyle = response;
        if (this.heroSubheadingStyle['padding-top']) {
          this.heroSubheadingPaddingTop = this.heroSubheadingStyle['padding-top'].replace('px', '');
        }
        if (this.heroSubheadingStyle['padding-left']) {
          this.heroSubheadingPaddingLeft = this.heroSubheadingStyle['padding-left'].replace('px', '');
        }
        if (this.heroSubheadingStyle['padding-right']) {
          this.heroSubheadingPaddingRight = this.heroSubheadingStyle['padding-right'].replace('px', '');
        }
        if (this.heroSubheadingStyle['padding-bottom']) {
          this.heroSubheadingPaddingBottom = this.heroSubheadingStyle['padding-bottom'].replace('px', '');
        }
      }
    });
  }

  setComponentLayout(heroComponentLayout: any) {
    this.builderHeroService.heroComponentLayout.next(heroComponentLayout);
  }

  setComponentLayoutSelectorClass(componentLayout: number) {
    if (componentLayout === this.heroComponentLayout['layout']) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  resetHeroAlignment() {
    this.setComponentLayout({ 'layout': 0 });
  }

  setHeroHeadingPaddingTop() {
    this.heroHeadingStyle['padding-top'] = `${ this.heroHeadingPaddingTop }px`;
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingLeft() {
    this.heroHeadingStyle['padding-left'] = `${ this.heroHeadingPaddingLeft }px`;
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingRight() {
    this.heroHeadingStyle['padding-right'] = `${ this.heroHeadingPaddingRight }px`;
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingBottom() {
    this.heroHeadingStyle['padding-bottom'] = `${ this.heroHeadingPaddingBottom }px`;
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroHeadingStyle() {
    this.heroHeadingStyle['padding-top'] = this.defaultHeroStyle['heroHeadingStyle']['padding-top'];
    this.heroHeadingStyle['padding-left'] = this.defaultHeroStyle['heroHeadingStyle']['padding-left'];
    this.heroHeadingStyle['padding-right'] = this.defaultHeroStyle['heroHeadingStyle']['padding-right'];
    this.heroHeadingStyle['padding-bottom'] = this.defaultHeroStyle['heroHeadingStyle']['padding-bottom'];
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroSubheadingPaddingTop() {
    this.heroSubheadingStyle['padding-top'] = `${ this.heroSubheadingPaddingTop }px`;
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingLeft() {
    this.heroSubheadingStyle['padding-left'] = `${ this.heroSubheadingPaddingLeft }px`;
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingRight() {
    this.heroSubheadingStyle['padding-right'] = `${ this.heroSubheadingPaddingRight }px`;
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingBottom() {
    this.heroSubheadingStyle['padding-bottom'] = `${ this.heroSubheadingPaddingBottom }px`;
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroSubheadingStyle() {
    this.heroSubheadingStyle['padding-top'] = this.defaultHeroStyle['heroSubheadingStyle']['padding-top'];
    this.heroSubheadingStyle['padding-left'] = this.defaultHeroStyle['heroSubheadingStyle']['padding-left'];
    this.heroSubheadingStyle['padding-right'] = this.defaultHeroStyle['heroSubheadingStyle']['padding-right'];
    this.heroSubheadingStyle['padding-bottom'] = this.defaultHeroStyle['heroSubheadingStyle']['padding-bottom'];
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  ngOnDestroy() {
    this.heroComponentLayoutSubscription.unsubscribe();
    this.heroHeadingStyleSubscription.unsubscribe();
    this.heroSubheadingStyleSubscription.unsubscribe();
    this.defaultHeroStyleSubscription.unsubscribe();
    this.heroTemplateSubscription.unsubscribe();
  }
}
