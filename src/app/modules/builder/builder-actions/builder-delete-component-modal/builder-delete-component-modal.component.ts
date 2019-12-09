import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderComponentService } from '../../builder-components/builder.component.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { ActiveComponents, ActiveComponentsFullSelector } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html'
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit {
  private activeComponentIndexSubscription: Subscription;
  activePage: string;
  pageComponents: any;
  private activeComponentIndex: number = 0;
  private components: Array<string>;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentService: BuilderComponentService,
    private builderService: BuilderService,
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
    this.builderService.setSidebarComponentsSetting();
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
