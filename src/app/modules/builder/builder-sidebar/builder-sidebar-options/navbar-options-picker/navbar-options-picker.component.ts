import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderNewPageModalComponent } from '../../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-options-picker',
  templateUrl: './navbar-options-picker.component.html',
  styleUrls: ['./navbar-options-picker.component.css']
})
export class NavbarOptionsPickerComponent implements OnInit {
  navbarMenuOptions: any;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  openNewPageModal() {
    this.modalService.open(BuilderNewPageModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  uploadLogo() {
  }
}
