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
  fonts: any;
  navbarBrandFont: string = 'Avenir Next Regular';
  navbarLinkFont: string = 'Avenir Next Regular';
  navbarLinkStyle: any;
  navbarBrandStyle: any;

  options: SortablejsOptions;
  private navbarMenuOptionsSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private fontsSubscription: Subscription;
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
      }
    });

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.fontsSubscription = this.builderService.fonts.subscribe(response => {
      if (response) {
        this.fonts = response;
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

  onBrandFontChange() {
    this.navbarBrandStyle['font-family'] = this.navbarBrandFont;
    this.builderNavbarService.navbarBrandStyle.next(this.navbarBrandStyle);
  }

  onLinkFontChange() {
    this.navbarLinkStyle['font-family'] = this.navbarLinkFont;
    this.builderNavbarService.navbarLinkStyle.next(this.navbarLinkStyle);
  }
}
