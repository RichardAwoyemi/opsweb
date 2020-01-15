import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ActiveComponents, ActiveComponentsFullSelector } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderService } from '../../builder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html'
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit {
  activePage: string;
  pageComponents: any;
  private activeComponentIndex: number = 0;
  private components: Array<string>;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;
  private activeComponentIndexSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit() {
    this.activeComponentIndexSubscription = this.builderComponentService.activeComponentIndex.subscribe((response => {
      if (response) {
        this.activeComponentIndex = response;
      }
    }));

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((response => {
      if (response) {
        this.activePage = response;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] == this.activePage) {
                this.components = response['pages'][i]['components'];
              }
            }
          }
        }));
      }
    }));
  }

  onConfirmButtonClick() {
    this.components.splice(this.activeComponentIndex, 1);
    this.components = UtilService.dedupeAdjacent(this.components, ActiveComponentsFullSelector.Placeholder);
    this.sessionStorageService.setItem('components', JSON.stringify(this.components));
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] == this.activePage) {
        this.pageComponents['pages'][i]['components'] = this.components;
      }
    }
    this.builderComponentService.pageComponents.next(this.pageComponents);
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.toastrService.success('Your component has been deleted.', 'Great!');
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.activePageSettingSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
    this.activeComponentIndexSubscription.unsubscribe();
  }
}
