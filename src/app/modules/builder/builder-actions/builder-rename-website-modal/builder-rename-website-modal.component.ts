import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-rename-website-modal',
  templateUrl: './builder-rename-website-modal.component.html'
})
export class BuilderRenameWebsiteModalComponent implements IModalComponent {
  @Input() websiteName;
  @Input() newWebsiteName;

  constructor(
    private activeModal: NgbActiveModal,
    private builderService: BuilderService
  ) {
  }

  onConfirmButtonClick() {
    this.builderService.websiteName.next(this.newWebsiteName);
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.builderService.websiteName.next(this.websiteName);
    this.activeModal.dismiss();
  }
}
