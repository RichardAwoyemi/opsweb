import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponentsPartialSelector, ActiveElements } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderService } from '../../builder.service';
import { BuilderActionsService } from '../builder-actions.service';

@Component({
  selector: 'app-builder-rename-page-modal',
  templateUrl: './builder-rename-page-modal.component.html'
})
export class BuilderRenamePageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePageIndex: number;
  @Input() activePage: string;
  pageName: string;
  displayError = false;
  disableSaveButton = false;
  navbarMenuOptions: any;
  pageComponents: any;
  activePageSetting: string;

  ngUnsubscribe = new Subject<void>();

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

    this.builderNavbarService.navbarMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
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

    this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), this.activePage);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activePageSetting.next('Home');
    this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));

    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName() {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
