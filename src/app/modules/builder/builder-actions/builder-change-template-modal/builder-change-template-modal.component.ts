import { IModalComponent } from '../../../../shared/models/modal';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { BuilderFeaturesService } from '../../builder-components/builder-features/builder-features.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-change-template-modal',
  templateUrl: './builder-change-template-modal.component.html'
})
export class BuilderChangeTemplateModalComponent implements IModalComponent {
  @Input() templateId;

  constructor(
    private activeModal: NgbActiveModal,
    private builderNavbarService: BuilderNavbarService,
    private builderHeroService: BuilderHeroService,
    private builderFooterService: BuilderFooterService,
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService
  ) {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.builderNavbarService.setComponentTemplate(this.templateId);
    this.builderHeroService.setComponentTemplate(this.templateId);
    this.builderFooterService.setComponentTemplate(this.templateId);
    this.builderFeaturesService.setComponentTemplate(this.templateId);
    this.toastrService.success('Your template has been updated.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
