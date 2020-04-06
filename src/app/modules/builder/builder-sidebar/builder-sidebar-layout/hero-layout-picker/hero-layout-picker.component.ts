import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { ActiveComponents, ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { TemplateService } from '../../../../../shared/services/template.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-hero-layout-picker',
  templateUrl: './hero-layout-picker.component.html'
})
export class HeroLayoutPickerComponent implements OnInit, OnDestroy {
  heroComponentLayout: number;
  heroTemplate: string = ActiveTemplates.Default;
  heroHeadingStyle: any;
  defaultHeroStyle: any;
  heroSubheadingStyle: any;
  pageComponents: any;
  heroHeadingPaddingTop: number;
  heroHeadingPaddingLeft: number;
  heroHeadingPaddingRight: number;
  heroHeadingPaddingBottom: number;
  heroSubheadingPaddingTop: number;
  heroSubheadingPaddingLeft: number;
  heroSubheadingPaddingRight: number;
  heroSubheadingPaddingBottom: number;
  activeEditComponentId: string;

  private heroComponentLayoutSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private defaultHeroStyleSubscription: Subscription;
  private heroTemplateSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private builderHeroService: BuilderHeroService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.heroTemplateSubscription = this.builderHeroService.heroTemplate.subscribe(heroTemplateResponse => {
      if (heroTemplateResponse) {
        this.heroTemplate = heroTemplateResponse;

        this.defaultHeroStyleSubscription = this.templateService.getTemplateStyle(this.heroTemplate).subscribe(response => {
          if (response) {
            this.defaultHeroStyle = response[ActiveComponents.Hero];
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

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
        for (let i = 0; i < this.pageComponents['pages'].length; i++) {
          for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
            if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
              this.heroSubheadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroSubheadingStyle'];
              this.heroHeadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroHeadingStyle'];
              this.heroComponentLayout = this.pageComponents['pages'][i]['components'][j]['heroComponentLayout'];
            }
          }
        }
      }
    });
  }

  setComponentLayout(heroComponentLayout: any) {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroComponentLayout', heroComponentLayout);
    this.builderHeroService.heroComponentLayout.next(heroComponentLayout);
  }

  setComponentLayoutSelectorClass(componentLayout: number) {
    if (componentLayout === this.heroComponentLayout) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  resetHeroAlignment() {
    this.setComponentLayout({ 'layout': 0 });
  }

  setHeroHeadingPaddingTop() {
    this.heroHeadingStyle['padding-top'] = `${this.heroHeadingPaddingTop}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingLeft() {
    this.heroHeadingStyle['padding-left'] = `${this.heroHeadingPaddingLeft}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingRight() {
    this.heroHeadingStyle['padding-right'] = `${this.heroHeadingPaddingRight}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingPaddingBottom() {
    this.heroHeadingStyle['padding-bottom'] = `${this.heroHeadingPaddingBottom}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroHeadingStyle() {
    this.heroHeadingStyle['padding-top'] = this.defaultHeroStyle['style']['heroHeadingStyle']['padding-top'];
    this.heroHeadingStyle['padding-left'] = this.defaultHeroStyle['style']['heroHeadingStyle']['padding-left'];
    this.heroHeadingStyle['padding-right'] = this.defaultHeroStyle['style']['heroHeadingStyle']['padding-right'];
    this.heroHeadingStyle['padding-bottom'] = this.defaultHeroStyle['style']['heroHeadingStyle']['padding-bottom'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroSubheadingPaddingTop() {
    this.heroSubheadingStyle['padding-top'] = `${this.heroSubheadingPaddingTop}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingLeft() {
    this.heroSubheadingStyle['padding-left'] = `${this.heroSubheadingPaddingLeft}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingRight() {
    this.heroSubheadingStyle['padding-right'] = `${this.heroSubheadingPaddingRight}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingPaddingBottom() {
    this.heroSubheadingStyle['padding-bottom'] = `${this.heroSubheadingPaddingBottom}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroSubheadingStyle() {
    this.heroSubheadingStyle['padding-top'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['padding-top'];
    this.heroSubheadingStyle['padding-left'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['padding-left'];
    this.heroSubheadingStyle['padding-right'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['padding-right'];
    this.heroSubheadingStyle['padding-bottom'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['padding-bottom'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  ngOnDestroy() {
    this.heroComponentLayoutSubscription.unsubscribe();
    this.heroHeadingStyleSubscription.unsubscribe();
    this.heroSubheadingStyleSubscription.unsubscribe();
    this.defaultHeroStyleSubscription.unsubscribe();
    this.heroTemplateSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
  }
}
