import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveElements } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
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
  pages: any;
  pageComponents: any;
  activePageSetting: string;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.pageComponents = response;
          this.pages = this.builderComponentsService.getPages();
        }
      });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    const pageName = this.pageName;

    this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), this.activePage);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activePageSetting.next('Home');
    this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));

    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName() {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.pages);
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.pages);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
