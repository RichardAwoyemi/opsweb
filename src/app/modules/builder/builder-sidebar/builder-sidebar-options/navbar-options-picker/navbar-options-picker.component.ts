import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsOptions } from 'ngx-sortablejs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SimpleModalService } from '../../../../../shared/components/simple-modal/simple-modal.service';
import { TemplateService } from '../../../../../shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates } from '../../../builder';
import { BuilderDeleteImageModalComponent } from '../../../builder-actions/builder-delete-image-modal/builder-delete-image-modal.component';
import { BuilderUploadImageModalComponent } from '../../../builder-actions/builder-upload-image-modal/builder-upload-image-modal.component';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css'],
})
export class NavbarOptionsPickerComponent implements OnInit, OnDestroy {
  navbarMenuOptions: any;
  navbarLogoImage: any;
  fontNames: any;
  fontUnits: any;
  imageUnits: any;
  navbarBrandFontName = 'Avenir Next Regular';
  navbarLinkFontName = 'Avenir Next Regular';
  navbarBrandFontUnit = 'px';
  navbarLinkFontUnit = 'px';
  navbarLogoImageUnit = 'px';
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarLogoImageStyle: any;
  navbarBrandFontSize: number;
  navbarLinkFontSize: number;
  navbarLogoImageSize: number;
  navbarTemplate: string = ActiveTemplates.Default;
  defaultNavbarStyle: any;
  options: SortablejsOptions;
  websiteChangeCount: number;
  pageComponents: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private templateService: TemplateService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService
  ) {
    this.options = {
      onUpdate: function () {
        const navbarMenuOptions = builderNavbarService.navbarMenuOptions.getValue();
        builderNavbarService.navbarMenuOptions.next(navbarMenuOptions);
        builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', navbarMenuOptions);
        builderFooterService.mapNavbarAndFooterMenuOptions(navbarMenuOptions, builderFooterService.footerMenuOptions.getValue());
      }
    };
  }

  ngOnInit() {
    this.builderNavbarService.navbarMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.builderNavbarService.navbarLogoImage.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarLogoImage = response;
      }
    });

    this.builderNavbarService.navbarLogoImageStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarLogoImageStyle = response;
        if (this.navbarLogoImageStyle['width']) {
          if (this.navbarLogoImageStyle['width'].indexOf('px') > -1) {
            this.navbarLogoImageSize = this.navbarLogoImageStyle['width'].replace('px', '');
          }
        }
      }
    });

    this.builderNavbarService.navbarTemplate.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(navbarTemplateResponse => {
      if (navbarTemplateResponse) {
        this.navbarTemplate = navbarTemplateResponse;

        this.templateService.getTemplateStyle(this.navbarTemplate).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response[ActiveComponents.Navbar];
          }
        });
      }
    });

    this.builderNavbarService.navbarBrandStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;

        if (this.navbarBrandStyle['font-size']) {
          if (this.navbarBrandStyle['font-size'].indexOf('px') > -1) {
            this.navbarBrandFontSize = this.navbarBrandStyle['font-size'].replace('px', '');
          }
          if (this.navbarBrandStyle['font-size'].indexOf('em') > -1) {
            this.navbarBrandFontSize = this.navbarBrandStyle['font-size'].replace('em', '');
          }
        }

        const footerFontNames = this.navbarBrandStyle['font-family'].split(',');
        this.navbarBrandFontName = footerFontNames[0].replace(/'/g, '');
      }
    });

    this.builderNavbarService.navbarLinkStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;

        if (this.navbarLinkStyle['font-size']) {
          if (this.navbarLinkStyle['font-size'].indexOf('px') > -1) {
            this.navbarLinkFontSize = this.navbarLinkStyle['font-size'].replace('px', '');
          }
          if (this.navbarLinkStyle['font-size'].indexOf('em') > -1) {
            this.navbarLinkFontSize = this.navbarLinkStyle['font-size'].replace('em', '');
          }
        }

        const footerFontNames = this.navbarLinkStyle['font-family'].split(',');
        this.navbarLinkFontName = footerFontNames[0].replace(/'/g, '');
      }
    });

    this.builderService.fontNames.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.builderService.fontUnits.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.openCropImageModal(event);
    } else {
      this.simpleModalService.displayMessage('Oops!', 'Please select a photo to upload.');
    }
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage === 'navbarLogoImage';
  }

  openCropImageModal(event: any) {
    const modal = this.modalService.open(BuilderUploadImageModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg'
    });
    modal.componentInstance.imageChangedEvent = event;
  }

  openDeleteImageModal() {
    this.modalService.open(BuilderDeleteImageModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  onNavbarBrandFontNameChange() {
    this.navbarBrandStyle['font-family'] = this.navbarBrandFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandFontSize() {
    this.navbarBrandStyle['font-size'] = this.navbarBrandFontSize + this.navbarBrandFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  onNavbarBrandFontUnitChange() {
    if (this.navbarBrandFontUnit === 'em') {
      if (this.navbarBrandFontSize < 16) {
        this.navbarBrandFontSize = 16;
      }
      this.navbarBrandFontSize = Math.round(this.navbarBrandFontSize / 16);
    }
    if (this.navbarBrandFontUnit === 'px') {
      this.navbarBrandFontSize = Math.round(this.navbarBrandFontSize * 16);
    }
    this.navbarBrandStyle['font-size'] = this.navbarBrandFontSize + this.navbarBrandFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  onNavbarLinkFontNameChange() {
    this.navbarLinkStyle['font-family'] = this.navbarLinkFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkFontSize() {
    this.navbarLinkStyle['font-size'] = this.navbarLinkFontSize + this.navbarLinkFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  onNavbarLinkFontUnitChange() {
    if (this.navbarLinkFontUnit === 'em') {
      if (this.navbarLinkFontSize < 16) {
        this.navbarLinkFontSize = 16;
      }
      this.navbarLinkFontSize = Math.round(this.navbarLinkFontSize / 16);
    }

    if (this.navbarLinkFontUnit === 'px') {
      this.navbarLinkFontSize = Math.round(this.navbarLinkFontSize * 16);
    }

    this.navbarLinkStyle['font-size'] = this.navbarLinkFontSize + this.navbarLinkFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarBrandFontName() {
    this.navbarBrandStyle['font-family'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['font-family'];
    const navbarBrandFontNames = this.navbarBrandStyle['font-family'].split(',');
    this.navbarBrandFontName = navbarBrandFontNames[0].replace(/'/g, '');
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  resetNavbarBrandFontSize() {
    this.navbarBrandStyle['font-size'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['font-size'];
    this.navbarBrandFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  resetNavbarLinkFontName() {
    this.navbarLinkStyle['font-family'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['font-family'];
    const navbarLinkFontNames = this.navbarLinkStyle['font-family'].split(',');
    this.navbarLinkFontName = navbarLinkFontNames[0].replace(/'/g, '');
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarLinkFontSize() {
    this.navbarLinkStyle['font-size'] = this.defaultNavbarStyle['style']['navbarLinkStyle']['font-size'];
    this.navbarLinkFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', this.navbarLinkStyle);
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarLogoImageSize() {
    this.navbarLogoImageStyle['width'] = this.defaultNavbarStyle['style']['navbarLogoImageStyle']['width'];
    this.navbarBrandStyle['width'] = this.defaultNavbarStyle['style']['navbarBrandStyle']['width'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarLogoImageStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLogoImageSize() {
    this.navbarLogoImageStyle['width'] = this.navbarLogoImageSize + this.navbarLogoImageUnit;
    this.navbarBrandStyle['width'] = this.navbarLogoImageSize + this.navbarLogoImageUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', this.navbarLogoImageStyle);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', this.navbarBrandStyle);
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
