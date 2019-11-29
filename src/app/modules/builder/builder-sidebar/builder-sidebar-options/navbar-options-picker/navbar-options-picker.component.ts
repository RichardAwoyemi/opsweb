import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsOptions } from 'ngx-sortablejs';
import { SimpleModalService } from '../../../../../shared/components/simple-modal/simple-modal.service';
import { NavbarOptionsPickerService } from './navbar-options-picker.service';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css']
})
export class NavbarOptionsPickerComponent implements OnInit {
  navbarMenuOptions: any;
  options: SortablejsOptions;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private modalService: NgbModal,
    private navbarOptionsPickerService: NavbarOptionsPickerService,
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
  }

  fileChangeEvent(event: any): void {
    this.navbarOptionsPickerService.fileChangeEvent = event;
    if (event.target.files && event.target.files.length) {
      this.openCropImageModal();
    } else {
      this.simpleModalService.displayMessage('Oops!', 'Please select a photo to upload.');
    }
  }

  openCropImageModal() {
  }
}
