import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderSelectImageModalComponent } from '../../../builder-actions/builder-select-image-modal/builder-select-image-modal.component';
import { Subscription } from 'rxjs';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderService } from '../../../builder.service';
import { ActiveComponentsPartialSelector, ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';

@Component({
  selector: 'app-hero-options-picker',
  templateUrl: './hero-options-picker.component.html',
  styleUrls: ['./hero-options-picker.component.css']
})
export class HeroOptionsPickerComponent implements OnInit, OnDestroy {
  heroImageUrl: string;
  heroImageAlt: string;
  navbarMenuOptions: any;
  menuOption: string;
  heroHeadingFontName = 'Avenir Next Medium';
  heroSubheadingFontName = 'Avenir Next Regular';
  heroImageSize = 100;
  heroImageUnit = '%';
  fontNames: any;
  fontUnits: any;
  websiteChangeCount: number;
  heroHeadingFontSize: number;
  heroSubheadingFontSize: number;
  heroButtonFontName = 'Avenir Next Medium';
  heroButtonFontSize: number;
  heroSubheadingFontUnit = 'px';
  heroHeadingFontUnit = 'px';
  heroButtonFontUnit = 'px';
  heroTemplate: string = ActiveTemplates.Default;
  defaultHeroStyle: any;
  heroHeadingStyle: any;
  heroImageStyle: any;
  heroSubheadingStyle: any;
  heroButtonStyle: any;
  pageComponents: any;

  private heroImageSizeSubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private defaultHeroStyleSubscription: Subscription;
  private heroTemplateSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private heroButtonStyleSubscription: Subscription;
  private heroImageStyleSubscription: Subscription;
  private heroMenuOptionSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.heroImageSizeSubscription = this.builderHeroService.heroImageSize.subscribe(response => {
      if (response) {
        this.heroImageSize = response;
      }
    });

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(navbarMenuOptionsResponse => {
      if (navbarMenuOptionsResponse) {
        this.navbarMenuOptions = navbarMenuOptionsResponse;

        this.heroMenuOptionSubscription = this.builderHeroService.heroButtonLink.subscribe(response => {
          if (response) {
            this.menuOption = response;
          } else {
            if (this.navbarMenuOptions.length > 0) {
              this.menuOption = this.navbarMenuOptions[1];
            } else {
              this.menuOption = this.navbarMenuOptions[0];
            }
          }
        });
      }
    });

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.heroTemplateSubscription = this.builderHeroService.heroTemplate.subscribe(heroTemplateResponse => {
      if (heroTemplateResponse) {
        this.heroTemplate = heroTemplateResponse;

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

        if (this.heroHeadingStyle['font-size']) {
          if (this.heroHeadingStyle['font-size'].indexOf('px') > -1) {
            this.heroHeadingFontSize = this.heroHeadingStyle['font-size'].replace('px', '');
          }
          if (this.heroHeadingStyle['font-size'].indexOf('em') > -1) {
            this.heroHeadingFontSize = this.heroHeadingStyle['font-size'].replace('em', '');
          }
        }

        const heroFontNames = this.heroHeadingStyle['font-family'].split(',');
        this.heroHeadingFontName = heroFontNames[0].replace(/'/g, '');
      }
    });

    this.heroSubheadingStyleSubscription = this.builderHeroService.heroSubheadingStyle.subscribe(response => {
      if (response) {
        this.heroSubheadingStyle = response;

        if (this.heroSubheadingStyle['font-size']) {
          if (this.heroSubheadingStyle['font-size'].indexOf('px') > -1) {
            this.heroSubheadingFontSize = this.heroSubheadingStyle['font-size'].replace('px', '');
          }
          if (this.heroHeadingStyle['font-size'].indexOf('em') > -1) {
            this.heroSubheadingFontSize = this.heroSubheadingStyle['font-size'].replace('em', '');
          }
        }

        const heroFontNames = this.heroSubheadingStyle['font-family'].split(',');
        this.heroSubheadingFontName = heroFontNames[0].replace(/'/g, '');
      }
    });

    this.heroButtonStyleSubscription = this.builderHeroService.heroButtonStyle.subscribe(response => {
      if (response) {
        this.heroButtonStyle = response;

        if (this.heroButtonStyle['font-size']) {
          if (this.heroButtonStyle['font-size'].indexOf('px') > -1) {
            this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('px', '');
          }
          if (this.heroHeadingStyle['font-size'].indexOf('em') > -1) {
            this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('em', '');
          }
        }

        const heroFontNames = this.heroSubheadingStyle['font-family'].split(',');
        this.heroButtonFontName = heroFontNames[0].replace(/'/g, '');
      }
    });

    this.heroButtonStyleSubscription = this.builderHeroService.heroButtonStyle.subscribe(response => {
      if (response) {
        this.heroButtonStyle = response;

        if (this.heroButtonStyle['font-size']) {
          if (this.heroButtonStyle['font-size'].indexOf('px') > -1) {
            this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('px', '');
          }
          if (this.heroHeadingStyle['font-size'].indexOf('em') > -1) {
            this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('em', '');
          }
        }

        const heroFontNames = this.heroSubheadingStyle['font-family'].split(',');
        this.heroButtonFontName = heroFontNames[0].replace(/'/g, '');
      }
    });

    this.heroImageStyleSubscription = this.builderHeroService.heroImageStyle.subscribe(response => {
      if (response) {
        this.heroImageStyle = response;
        this.heroImageUrl = response['src'];
        this.heroImageAlt = response['alt'];
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  setHeroImageOptionsStyle(key, value) {
    const targetComponentLocation = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector.Hero);
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i]['activePageIndex'];
      const activeComponentIndex = targetComponentLocation[i]['activeComponentIndex'];
      this.pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['heroImageStyle'][key] = value;
    }
    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  openSelectImageModal() {
    this.modalService.open(BuilderSelectImageModalComponent, {windowClass: 'modal-holder', centered: true, size: 'lg'});
  }

  resetHeroImage() {
    this.heroImageStyle['src'] = this.defaultHeroStyle['heroImageStyle']['src'];
    this.setHeroImageOptionsStyle('src', this.heroImageStyle['src']);
    this.builderHeroService.heroImageUrl.next(this.heroImageStyle['src']);
    this.builderHeroService.heroImageAlt.next(this.heroImageStyle['alt']);
  }

  resetHeroImageSize() {
    this.heroImageStyle['width'] = this.defaultHeroStyle['heroImageStyle']['width'];
    this.setHeroImageOptionsStyle('width', this.heroImageStyle['width']);
    this.builderHeroService.heroImageSize.next(this.heroImageStyle['width'].replace('%', ''));
  }

  setHeroImageSize() {
    this.heroImageStyle['width'] = this.heroImageSize + '%';
    this.builderHeroService.heroImageStyle.next(this.heroImageStyle);
    this.builderHeroService.heroImageSize.next(this.heroImageSize);
    this.setHeroImageOptionsStyle('width', this.heroImageStyle['src']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetHeroHeadingFontName() {
    this.heroHeadingStyle['font-family'] = this.defaultHeroStyle['heroHeadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroHeadingFontSize() {
    this.heroHeadingStyle['font-size'] = this.defaultHeroStyle['heroHeadingStyle']['font-size'];
    this.heroHeadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  onHeroHeadingFontNameChange() {
    this.heroHeadingStyle['font-family'] = this.heroHeadingFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  onHeroHeadingFontUnitChange() {
    if (this.heroHeadingFontUnit === 'em') {
      if (this.heroHeadingFontSize < 16) {
        this.heroHeadingFontSize = 16;
      }
      this.heroHeadingFontSize = Math.round(this.heroHeadingFontSize / 16);
    }

    if (this.heroHeadingFontUnit === 'px') {
      this.heroHeadingFontSize = Math.round(this.heroHeadingFontSize * 16);
    }

    this.heroHeadingStyle['font-size'] = this.heroHeadingFontSize + this.heroHeadingFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingFontSize() {
    this.heroHeadingStyle['font-size'] = this.heroHeadingFontSize + this.heroHeadingFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroSubheadingFontName() {
    this.heroSubheadingStyle['font-family'] = this.defaultHeroStyle['heroSubheadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroSubheadingFontSize() {
    this.heroSubheadingStyle['font-size'] = this.defaultHeroStyle['heroSubheadingStyle']['font-size'];
    this.heroSubheadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  onHeroSubheadingFontUnitChange() {
    if (this.heroSubheadingFontUnit === 'em') {
      if (this.heroSubheadingFontSize < 16) {
        this.heroSubheadingFontSize = 16;
      }
      this.heroSubheadingFontSize = Math.round(this.heroSubheadingFontSize / 16);
    }

    if (this.heroSubheadingFontUnit === 'px') {
      this.heroSubheadingFontSize = Math.round(this.heroHeadingFontSize * 16);
    }

    this.heroSubheadingStyle['font-size'] = this.heroSubheadingStyle + this.heroSubheadingFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingFont() {
    this.heroSubheadingStyle['font-family'] = this.heroSubheadingFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingFontSize() {
    this.heroSubheadingStyle['font-size'] = this.heroSubheadingFontSize + this.heroSubheadingFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroButtonFontName() {
    this.heroButtonStyle['font-family'] = this.defaultHeroStyle['heroButtonStyle']['font-family'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  resetHeroButtonFontSize() {
    this.heroButtonStyle['font-size'] = this.defaultHeroStyle['heroButtonStyle']['font-size'];
    this.heroButtonFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  onHeroButtonFontNameChange() {
    this.heroButtonStyle['font-family'] = this.heroButtonFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  onHeroButtonFontUnitChange() {
    if (this.heroButtonFontUnit === 'em') {
      if (this.heroButtonFontSize < 16) {
        this.heroButtonFontSize = 16;
      }
      this.heroButtonFontSize = Math.round(this.heroButtonFontSize / 16);
    }

    if (this.heroButtonFontUnit === 'px') {
      this.heroButtonFontSize = Math.round(this.heroButtonFontSize * 16);
    }

    this.heroButtonStyle['font-size'] = this.heroButtonFontSize + this.heroButtonFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  setHeroButtonFontSize() {
    this.heroButtonStyle['font-size'] = this.heroButtonFontSize + this.heroButtonFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  resetHeroButtonLink() {
    if (this.navbarMenuOptions.length > 0) {
      this.menuOption = this.navbarMenuOptions[1];
    } else {
      this.menuOption = this.navbarMenuOptions[0];
    }
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonLink', this.menuOption);
    this.builderHeroService.heroButtonLink.next(this.menuOption);
  }

  setHeroButtonLink() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonLink', this.menuOption);
    this.builderHeroService.heroButtonLink.next(this.menuOption);
  }

  ngOnDestroy() {
    this.heroImageSizeSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.defaultHeroStyleSubscription.unsubscribe();
    this.heroTemplateSubscription.unsubscribe();
    this.heroHeadingStyleSubscription.unsubscribe();
    this.heroSubheadingStyleSubscription.unsubscribe();
    this.heroButtonStyleSubscription.unsubscribe();
    this.heroImageStyleSubscription.unsubscribe();
    this.heroMenuOptionSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}
