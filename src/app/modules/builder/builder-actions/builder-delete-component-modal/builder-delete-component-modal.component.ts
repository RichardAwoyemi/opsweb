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
  private activeComponentIndex: number = 0;
  private components: Array<string>;

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentService: BuilderComponentService,
    private builderService: BuilderService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit() {
    this.components = JSON.parse(SessionStorageService.getItem('components'));
    this.activeComponentIndexSubscription = this.builderComponentService.activeComponentIndex.subscribe((response => {
      if (response) {
        this.activeComponentIndex = response;
      }
    }));
  }

  onConfirmButtonClick() {
    this.components.splice(this.activeComponentIndex, 1);
    this.components = UtilService.dedupeAdjacent(this.components, ActiveComponentsFullSelector.Placeholder);
    this.sessionStorageService.setItem('components', JSON.stringify(this.components));
    this.builderComponentService.builderComponents.next(this.components);
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
    window.postMessage({ 'for': 'opsonion', 'action': 'recycle-dom' }, '*');
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
