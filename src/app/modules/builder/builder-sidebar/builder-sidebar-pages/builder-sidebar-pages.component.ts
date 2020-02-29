import { Component, OnInit } from '@angular/core';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveComponentsPartialSelector, ActiveSettings } from '../../builder';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderRenamePageModalComponent } from '../../builder-actions/builder-rename-page-modal/builder-rename-page-modal.component';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { BuilderAddComponentModalComponent } from '../../builder-actions/builder-add-component-modal/builder-add-component-modal.component';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';

@Component({
  selector: 'app-builder-sidebar-pages',
  templateUrl: './builder-sidebar-pages.component.html',
  styleUrls: ['./builder-sidebar-pages.component.css']
})
export class BuilderSidebarPagesComponent implements OnInit {
  settingsName: string = ActiveSettings.Pages;
  activeEditSetting: string;
  activePage: string;
  navbarMenuOptions: any;
  componentListOptions: any;
  pageComponents: any;
  options: SortablejsOptions;
  private activeEditSettingSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private builderComponentService: BuilderComponentsService,
    private simpleModalService: SimpleModalService
  ) {
    this.options = {
      onUpdate: function (e: any) {
        const tempComponentArrayWithoutPlaceholders = [];
        for (let i = 0; i < e.target.children.length; i++) {
          tempComponentArrayWithoutPlaceholders.push(e.target.children[i].id);
        }
      }
    };
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

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageSettingsResponse => {
      if (activePageSettingsResponse) {
        this.activePage = activePageSettingsResponse;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] === this.activePage) {
                this.componentListOptions = this.pageComponents['pages'][i]['components'].filter(function (a) {
                  return a['componentName'] !== ActiveComponentsPartialSelector.Placeholder;
                });
              }
            }
          }
        }));
      }
    }));
  }

  getComponentCleanName(component: any) {
    return BuilderComponentsService.getComponentCleanName(component);
  }

  openNewPageModal() {
    this.modalService.open(BuilderNewPageModalComponent, {windowClass: 'modal-holder', centered: true});
  }

  openRenamePageModal(pageName, pageIndex) {
    if (pageName !== 'Home') {
      const modal = this.modalService.open(BuilderRenamePageModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.activePage = pageName;
      modal.componentInstance.activePageIndex = pageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot rename the ${pageName} page.`);
    }
  }

  openDeletePageModal(pageName, pageIndex) {
    if (pageName !== 'Home') {
      const modal = this.modalService.open(BuilderDeletePageModalComponent, {
        windowClass: 'modal-holder',
        centered: true
      });
      modal.componentInstance.activePage = pageName;
      modal.componentInstance.activePageIndex = pageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot delete the ${pageName} page.`);
    }
  }

  viewPage(navbarMenuOption) {
    this.builderService.activePageSetting.next(navbarMenuOption);
  }

  openAddComponentModal() {
    this.modalService.open(BuilderAddComponentModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg'
    });
  }

  openDeleteComponentModal() {
    this.modalService.open(BuilderDeleteComponentModalComponent, {windowClass: 'modal-holder', centered: true});
  }
}
