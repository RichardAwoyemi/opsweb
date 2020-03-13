import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderActionsService } from '../builder-actions.service';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponentsPartialSelector, ActiveElements } from '../../builder';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';

@Component({
  selector: 'app-builder-rename-page-modal',
  templateUrl: './builder-rename-page-modal.component.html'
})
export class BuilderRenamePageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePage: string;
  @Input() activePageIndex: number;
  pageName: string;
  displayError = false;
  disableSaveButton = false;
  navbarMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((response => {
      if (response) {
        this.pageComponents = response;
      }
    }));
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    const pageIndex = this.activePageIndex;
    const pageName = this.pageName;

    this.navbarMenuOptions[pageIndex] = pageName;

    this.builderFooterService.setFooterMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', this.builderFooterService.footerMenuOptions.getValue());
    this.builderNavbarService.setNavbarMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', this.builderNavbarService.navbarMenuOptions.getValue());

    this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), pageIndex);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activePageSetting.next('Home');
    this.builderService.activePageIndex.next(0);

    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName() {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
