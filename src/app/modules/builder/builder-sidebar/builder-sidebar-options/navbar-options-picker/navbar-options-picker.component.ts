import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsOptions } from 'ngx-sortablejs';
import { SimpleModalService } from '../../../../../shared/components/simple-modal/simple-modal.service';
import { BuilderUploadImageModalComponent } from '../../../builder-actions/builder-upload-image-modal/builder-upload-image-modal.component';
import { BuilderDeleteImageModalComponent } from '../../../builder-actions/builder-delete-image-modal/builder-delete-image-modal.component';
import { BuilderService } from '../../../builder.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css'],
})
export class NavbarOptionsPickerComponent implements OnInit {
  navbarMenuOptions: any;
  navbarLogoImage: any;
  fontNames: any;
  fontUnits: any;
  imageUnits: any;
  navbarBrandFontName: string = 'Avenir Next Regular';
  navbarLinkFontName: string = 'Avenir Next Regular';
  navbarBrandFontUnit: string = 'px';
  navbarLinkFontUnit: string = 'px';
  navbarLogoImageUnit: string = 'px';
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

  private navbarMenuOptionsSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLogoImageStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private defaultNavbarStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private builderService: BuilderService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService
  ) {
    this.options = {
      onUpdate: function (e: any) {
        let navbarMenuOptions = builderNavbarService.navbarMenuOptions.getValue();
        const oldIndexNavbarMenuOption = navbarMenuOptions[e.oldIndex];
        const newIndexNavbarMenuOption = navbarMenuOptions[e.newIndex];
        navbarMenuOptions[e.newIndex] = oldIndexNavbarMenuOption;
        navbarMenuOptions[e.newIndex] = newIndexNavbarMenuOption;
        builderNavbarService.navbarMenuOptions.next(navbarMenuOptions);
        const footerMenuOptions = builderFooterService.sortFooterMenuOptions(builderFooterService.footerMenuOptions.getValue(), navbarMenuOptions);
        builderFooterService.footerMenuOptions.next(footerMenuOptions);
      }
    };
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.navbarLogoImageSubscription = this.builderNavbarService.navbarLogoImage.subscribe(response => {
      if (response) {
        this.navbarLogoImage = response;
      }
    });

    this.navbarLogoImageStyleSubscription = this.builderNavbarService.navbarLogoImageStyle.subscribe(response => {
      if (response) {
        this.navbarLogoImageStyle = response;
        if (this.navbarLogoImageStyle['width']) {
          if (this.navbarLogoImageStyle['width'].indexOf('px') > -1) {
            this.navbarLogoImageSize = this.navbarLogoImageStyle['width'].replace('px', '');
          }
        }
      }
    });

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
      if (response) {
        this.navbarTemplate = response;

        this.defaultNavbarStyleSubscription = this.builderNavbarService.getDefaultNavbarStyle(this.navbarTemplate).subscribe(response => {
          if (response) {
            this.defaultNavbarStyle = response;
          }
        });
      }
    });

    this.navbarBrandStyleSubscription = this.builderNavbarService.navbarBrandStyle.subscribe(response => {
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

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
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

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
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
    return !this.navbarLogoImage || this.navbarLogoImage == 'navbarLogoImage';
  }


  openCropImageModal(event: any) {
    const modal = this.modalService.open(BuilderUploadImageModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
    modal.componentInstance.imageChangedEvent = event;
  }

  openDeleteImageModal() {
    this.modalService.open(BuilderDeleteImageModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  onNavbarBrandFontNameChange() {
    this.navbarBrandStyle['font-family'] = this.navbarBrandFontName;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarBrandFontSize() {
    this.navbarBrandStyle['font-size'] = this.navbarBrandFontSize + this.navbarBrandFontUnit;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  onNavbarBrandFontUnitChange() {
    if (this.navbarBrandFontUnit == 'em') {
      if (this.navbarBrandFontSize < 16) {
        this.navbarBrandFontSize = 16;
      }
      this.navbarBrandFontSize = Math.round(this.navbarBrandFontSize / 16);
    }
    if (this.navbarBrandFontUnit == 'px') {
      this.navbarBrandFontSize = Math.round(this.navbarBrandFontSize * 16);
    }
    this.navbarBrandStyle['font-size'] = this.navbarBrandFontSize + this.navbarBrandFontUnit;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  onNavbarLinkFontNameChange() {
    this.navbarLinkStyle['font-family'] = this.navbarLinkFontName;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  setNavbarLinkFontSize() {
    this.navbarLinkStyle['font-size'] = this.navbarLinkFontSize + this.navbarLinkFontUnit;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  onNavbarLinkFontUnitChange() {
    if (this.navbarLinkFontUnit == 'em') {
      if (this.navbarLinkFontSize < 16) {
        this.navbarLinkFontSize = 16;
      }
      this.navbarLinkFontSize = Math.round(this.navbarLinkFontSize / 16);
    }

    if (this.navbarLinkFontUnit == 'px') {
      this.navbarLinkFontSize = Math.round(this.navbarLinkFontSize * 16);
    }

    this.navbarLinkStyle['font-size'] = this.navbarLinkFontSize + this.navbarLinkFontUnit;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarBrandFontName() {
    this.navbarBrandStyle['font-family'] = this.defaultNavbarStyle['navbarBrandStyle']['font-family'];
    const navbarBrandFontNames = this.navbarBrandStyle['font-family'].split(',');
    this.navbarBrandFontName = navbarBrandFontNames[0].replace(/'/g, '');
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  resetNavbarBrandFontSize() {
    this.navbarBrandStyle['font-size'] = this.defaultNavbarStyle['navbarBrandStyle']['font-size'];
    this.navbarBrandFontUnit = 'px';
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  resetNavbarLinkFontName() {
    this.navbarLinkStyle['font-family'] = this.defaultNavbarStyle['navbarLinkStyle']['font-family'];
    const navbarLinkFontNames = this.navbarLinkStyle['font-family'].split(',');
    this.navbarLinkFontName = navbarLinkFontNames[0].replace(/'/g, '');
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarLinkFontSize() {
    this.navbarLinkStyle['font-size'] = this.defaultNavbarStyle['navbarLinkStyle']['font-size'];
    this.navbarLinkFontUnit = 'px';
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }

  resetNavbarLogoImageSize() {
    this.navbarLogoImageStyle['width'] = this.defaultNavbarStyle['navbarLogoImageStyle']['width'];
    this.navbarBrandStyle['width'] = this.defaultNavbarStyle['navbarLogoImageStyle']['width'];
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  setNavbarLogoImageSize() {
    this.navbarLogoImageStyle['width'] = this.navbarLogoImageSize + this.navbarLogoImageUnit;
    this.navbarBrandStyle['width'] = this.navbarLogoImageSize + this.navbarLogoImageUnit;
    this.builderNavbarService.navbarLogoImageStyle.next(this.navbarLogoImageStyle);
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.navbarLogoImageSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.navbarBrandStyleSubscription.unsubscribe();
    this.navbarLogoImageStyleSubscription.unsubscribe();
    this.navbarLinkStyleSubscription.unsubscribe();
    this.navbarTemplateSubscription.unsubscribe();
    this.defaultNavbarStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
