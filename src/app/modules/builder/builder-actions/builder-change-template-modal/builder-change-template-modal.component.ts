import { IModalComponent } from '../../../../shared/models/modal';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../../../shared/services/template.service';

@Component({
  selector: 'app-builder-change-template-modal',
  templateUrl: './builder-change-template-modal.component.html'
})
export class BuilderChangeTemplateModalComponent implements IModalComponent {
  @Input() templateId;

  constructor(
    private activeModal: NgbActiveModal,
    private templateService: TemplateService
  ) {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.templateService.updateTemplate(this.templateId);
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
