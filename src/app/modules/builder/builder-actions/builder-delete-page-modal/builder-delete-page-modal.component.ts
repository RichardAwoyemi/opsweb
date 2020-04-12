import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html'
})
export class BuilderDeletePageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePage;
  @Input() activePageIndex;
  pageComponents: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
  ) {
  }

  ngOnInit() {

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response => {
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
    this.builderComponentsService.deletePage(this.activePage);
    this.builderService.activePageSetting.next('Home');
    this.toastrService.success('Your page has been deleted.', 'Great!');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
