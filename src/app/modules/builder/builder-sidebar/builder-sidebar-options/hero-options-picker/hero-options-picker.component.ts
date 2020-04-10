import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from '../../../../../shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveTemplates } from '../../../builder';
import { BuilderSelectImageModalComponent } from '../../../builder-actions/builder-select-image-modal/builder-select-image-modal.component';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-hero-options-picker',
  templateUrl: './hero-options-picker.component.html',
  styleUrls: ['./hero-options-picker.component.css']
})
export class HeroOptionsPickerComponent implements OnInit, OnDestroy {
  heroImageUrl: string;
  heroImageAlt: string;
  menuOptions: any;
  menuOption: string;
  heroHeadingFontName = 'Avenir Next Medium';
  heroSubheadingFontName = 'Avenir Next Regular';
  heroImageSize: number;
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
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private templateService: TemplateService,
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponentId = response;
          this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(pageDetails => {
              if (pageDetails) {
                this.pageComponents = pageDetails;
                for (let i = 0; i < this.pageComponents['pages'].length; i++) {
                  for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                    if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
                      this.heroSubheadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroSubheadingStyle'];
                      this.heroHeadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroHeadingStyle'];
                      this.heroButtonStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroButtonStyle'];
                      this.heroImageStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroImageStyle'];
                      this.heroImageUrl = this.pageComponents['pages'][i]['components'][j]['style']['heroImageStyle']['src'];
                      this.heroImageAlt = this.pageComponents['pages'][i]['components'][j]['style']['heroImageStyle']['alt'];
                      this.heroImageSize = this.pageComponents['pages'][i]['components'][j]['style']['heroImageStyle']['width'].replace('%', '');
                      this.menuOptions = this.builderComponentsService.getPages();
                      this.menuOption = this.pageComponents['pages'][i]['components'][j]['heroButtonLink'] || this.menuOptions[Math.min(1, this.pageComponents['pages'].length - 1)];
                    }
                  }
                }

                if (this.heroHeadingStyle) {
                  if (this.heroHeadingStyle['font-size']) {
                    if (this.heroHeadingStyle['font-size'].indexOf('px') > -1) {
                      this.heroHeadingFontSize = this.heroHeadingStyle['font-size'].replace('px', '');
                    }
                    if (this.heroHeadingStyle['font-size'].indexOf('em') > -1) {
                      this.heroHeadingFontSize = this.heroHeadingStyle['font-size'].replace('em', '');
                    }
                  }
                }

                if (this.heroSubheadingStyle) {
                  if (this.heroSubheadingStyle['font-size']) {
                    if (this.heroSubheadingStyle['font-size'].indexOf('px') > -1) {
                      this.heroSubheadingFontSize = this.heroSubheadingStyle['font-size'].replace('px', '');
                    }
                    if (this.heroSubheadingStyle['font-size'].indexOf('em') > -1) {
                      this.heroSubheadingFontSize = this.heroSubheadingStyle['font-size'].replace('em', '');
                    }
                  }
                }

                if (this.heroButtonStyle) {
                  if (this.heroButtonStyle['font-size']) {
                    if (this.heroButtonStyle['font-size'].indexOf('px') > -1) {
                      this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('px', '');
                    }
                    if (this.heroButtonStyle['font-size'].indexOf('em') > -1) {
                      this.heroButtonFontSize = this.heroButtonStyle['font-size'].replace('em', '');
                    }
                  }
                }
              }
            });
        }
      });

    this.builderService.fontUnits.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.builderService.fontNames.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.websiteChangeCount = response['value'];
        }
      });

    this.builderHeroService.heroTemplate.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(heroTemplateResponse => {
        if (heroTemplateResponse) {
          this.heroTemplate = heroTemplateResponse;

          this.templateService.getTemplateStyle(this.heroTemplate).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.defaultHeroStyle = response[ActiveComponents.Hero];
              }
            });
        }
      });
  }

  openSelectImageModal() {
    const modalRef = this.modalService.open(BuilderSelectImageModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.componentId = this.activeEditComponentId;
    modalRef.componentInstance.parentKey = 'heroImageStyle';
  }

  resetHeroImage() {
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, 'heroImageStyle', 'src', this.defaultHeroStyle['style']['heroImageStyle']['src']);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, 'heroImageStyle', 'alt', this.defaultHeroStyle['style']['heroImageStyle']['alt']);
    this.builderHeroService.heroImageUrl.next(this.heroImageStyle['src']);
    this.builderHeroService.heroImageAlt.next(this.heroImageStyle['alt']);
  }

  resetHeroImageSize() {
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, 'heroImageStyle', 'width', this.defaultHeroStyle['style']['heroImageStyle']['width']);
    this.builderHeroService.heroImageSize.next(this.heroImageStyle['width'].replace('%', ''));
  }

  setHeroImageSize() {
    this.heroImageStyle['width'] = this.heroImageSize + '%';
    this.builderHeroService.heroImageStyle.next(this.heroImageStyle);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, 'heroImageStyle', 'src', this.heroImageStyle['src']);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, 'heroImageStyle', 'width', this.heroImageStyle['width']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetHeroHeadingFontName() {
    this.heroHeadingStyle['font-family'] = this.defaultHeroStyle['style']['heroHeadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroHeadingFontSize() {
    this.heroHeadingStyle['font-size'] = this.defaultHeroStyle['style']['heroHeadingStyle']['font-size'];
    this.heroHeadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  onHeroHeadingFontNameChange() {
    this.heroHeadingStyle['font-family'] = this.heroHeadingFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
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
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  setHeroHeadingFontSize() {
    this.heroHeadingStyle['font-size'] = this.heroHeadingFontSize + this.heroHeadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
  }

  resetHeroSubheadingFontName() {
    this.heroSubheadingStyle['font-family'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroSubheadingFontSize() {
    this.heroSubheadingStyle['font-size'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['font-size'];
    this.heroSubheadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
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
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingFont() {
    this.heroSubheadingStyle['font-family'] = this.heroSubheadingFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  setHeroSubheadingFontSize() {
    this.heroSubheadingStyle['font-size'] = this.heroSubheadingFontSize + this.heroSubheadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
  }

  resetHeroButtonFontName() {
    this.heroButtonStyle['font-family'] = this.defaultHeroStyle['style']['heroButtonStyle']['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  resetHeroButtonFontSize() {
    this.heroButtonStyle['font-size'] = this.defaultHeroStyle['style']['heroButtonStyle']['font-size'];
    this.heroButtonFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  onHeroButtonFontNameChange() {
    this.heroButtonStyle['font-family'] = this.heroButtonFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
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
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  setHeroButtonFontSize() {
    this.heroButtonStyle['font-size'] = this.heroButtonFontSize + this.heroButtonFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  resetHeroButtonLink() {
    this.menuOption = this.menuOptions[Math.min(1, this.pageComponents['pages'].length - 1)];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonLink', this.menuOption);
    this.builderHeroService.heroButtonLink.next(this.menuOption);
  }

  setHeroButtonLink() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonLink', this.menuOption);
    this.builderHeroService.heroButtonLink.next(this.menuOption);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
