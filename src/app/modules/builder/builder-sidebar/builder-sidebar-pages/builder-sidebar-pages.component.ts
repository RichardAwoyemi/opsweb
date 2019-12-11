import { Component } from '@angular/core';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveSettings } from '../../builder';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderRenamePageModalComponent } from '../../builder-actions/builder-rename-page-modal/builder-rename-page-modal.component';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';

@Component({
  selector: 'app-builder-sidebar-pages',
  templateUrl: './builder-sidebar-pages.component.html',
  styleUrls: ['./builder-sidebar-pages.component.css']
})
export class BuilderSidebarPagesComponent {
  settingsName: string = ActiveSettings.Pages;
  activeEditSetting: string;
  navbarMenuOptions: any;
  private activeEditSettingSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private simpleModalService: SimpleModalService
  ) {
  }

  ngOnInit() {
    this.activeEditSettingSubscription = this.builderService.activeEditSetting.subscribe(response => {
      if (response) {
        this.activeEditSetting = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  openNewPageModal() {
    this.modalService.open(BuilderNewPageModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  openRenamePageModal(pageName, pageIndex) {
    if (pageName !== 'Home') {
      const modal = this.modalService.open(BuilderRenamePageModalComponent, { windowClass: 'modal-holder', centered: true });
      modal.componentInstance.activePage = pageName;
      modal.componentInstance.activePageIndex = pageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot rename the ${ pageName } page.`);
    }
  }

  openDeletePageModal(pageName, pageIndex) {
    if (pageName !== 'Home') {
      const modal = this.modalService.open(BuilderDeletePageModalComponent, { windowClass: 'modal-holder', centered: true });
      modal.componentInstance.activePage = pageName;
      modal.componentInstance.activePageIndex = pageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot delete the ${ pageName } page.`);
    }
  }

  viewPage(navbarMenuOption) {
    this.builderService.activePageSetting.next(navbarMenuOption);
  }
}
