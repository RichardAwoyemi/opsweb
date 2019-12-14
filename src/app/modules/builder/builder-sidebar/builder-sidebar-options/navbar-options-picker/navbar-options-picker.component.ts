import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsOptions } from 'ngx-sortablejs';
import { SimpleModalService } from '../../../../../shared/components/simple-modal/simple-modal.service';
import { BuilderUploadImageModalComponent } from '../../../builder-actions/builder-upload-image-modal/builder-upload-image-modal.component';
import { BuilderDeleteImageModalComponent } from '../../../builder-actions/builder-delete-image-modal/builder-delete-image-modal.component';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css'],
})
export class NavbarOptionsPickerComponent implements OnInit {
  navbarMenuOptions: any;
  navbarLogoImage: any;
  fontNames: any;
  fontSizes: any;
  fontUnits: any;
  navbarBrandFontName: string = 'Avenir Next Regular';
  navbarLinkFontName: string = 'Avenir Next Regular';
  navbarBrandFontUnit: string = 'px';
  navbarLinkFontUnit: string = 'px';
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarBrandFontSize: number;
  navbarLinkFontSize: number;

  options: SortablejsOptions;
  private navbarMenuOptionsSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
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
}
