import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveComponentsPartialSelector, ActiveSettings, MAX_NUMBER_OF_PAGES } from '../../builder';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderRenamePageModalComponent } from '../../builder-actions/builder-rename-page-modal/builder-rename-page-modal.component';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-sidebar-pages',
  templateUrl: './builder-sidebar-pages.component.html',
  styleUrls: ['./builder-sidebar-pages.component.css']
})
export class BuilderSidebarPagesComponent implements OnInit, OnDestroy {
  settingsName: string = ActiveSettings.Pages;
  activeEditSetting: string;
  activePage: string;
  componentListOptions: any;
  pageComponents: any;
  activePageIndex: number;
  menuOptions: any;

  menuSortableOptions: any;
  componentListSortableOptions: SortablejsOptions;

  private activeEditSettingSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private activePageIndexSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    private builderComponentsService: BuilderComponentsService,
    private simpleModalService: SimpleModalService
  ) {
    this.menuSortableOptions = {
      onUpdate: function (e: any) {
        builderComponentsService.reorderPages(e.target.innerText.split('\n'));
      }
    };

    this.componentListSortableOptions = {
      onUpdate: function (e: any) {
        const tempComponentArrayWithoutPlaceholders = [];
        for (let i = 0; i < e.target.children.length; i++) {
          const componentLocation = builderComponentsService.getActiveTargetComponentById(e.target.children[i].id);
          const component = builderComponentsService.getComponent(componentLocation['activePageIndex'], componentLocation['activeComponentIndex']);
          component['timestamp'] = new Date().getTime();
          tempComponentArrayWithoutPlaceholders.push(component);
        }
        const tempComponentArrayWithPlaceholders = BuilderComponentsService.addPlaceholdersOnSinglePage(tempComponentArrayWithoutPlaceholders);
        const pageComponents = builderComponentsService.pageComponents.getValue();
        const activePageIndex = builderService.activePageIndex.getValue();
        pageComponents['pages'][activePageIndex]['components'] = tempComponentArrayWithPlaceholders;
        builderComponentsService.pageComponents.next(pageComponents);
      }
    };
  }

  ngOnInit() {
    this.activeEditSettingSubscription = this.builderService.activeEditSetting.subscribe(response => {
      if (response) {
        this.activeEditSetting = response;
      }
    });

    this.activePageIndexSubscription = this.builderService.activePageIndex.subscribe(response => {
      if (response) {
        this.activePageIndex = response;
      }
    });

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageSettingsResponse => {
      if (activePageSettingsResponse) {
        this.activePage = activePageSettingsResponse;
        this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            this.menuOptions = this.builderComponentsService.getPageArray(this.pageComponents);
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
    const numberOfPages = this.pageComponents['pages'].length;
    if (numberOfPages + 1 > MAX_NUMBER_OF_PAGES) {
      this.toastrService.warning(`You cannot create more than ${MAX_NUMBER_OF_PAGES} pages on your current plan.`, 'Oops!');
    } else {
      this.modalService.open(BuilderNewPageModalComponent, { windowClass: 'modal-holder', centered: true });
    }
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

  viewPage(menuOption) {
    this.builderService.activePageSetting.next(menuOption);
  }

  openComponentsPanel() {
    this.builderService.setActiveEditSetting(ActiveSettings.Components);
    this.builderService.setSidebarComponentsSetting();
  }

  openDeleteComponentModal(componentId) {
    const modal = this.modalService.open(BuilderDeleteComponentModalComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modal.componentInstance.componentId = componentId;
  }

  onDragStart() {
    window.postMessage({
      'for': 'opsonion',
      'action': 'non-component-selected',
    }, '*');
  }

  onDragExit() {
    window.postMessage({
      'for': 'opsonion',
      'action': null,
    }, '*');
  }

  ngOnDestroy() {
    this.activeEditSettingSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.activePageIndexSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
