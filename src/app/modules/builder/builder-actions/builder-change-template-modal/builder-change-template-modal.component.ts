import { IModalComponent } from '../../../../shared/models/modal';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveNavbarThemes } from '../../builder';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';

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
    private builderFooterService: BuilderFooterService
  ) {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.builderNavbarService.navbarTheme.next(ActiveNavbarThemes.Default);
    this.builderNavbarService.navbarTemplate.next(this.templateId);
    this.builderNavbarService.setNavbarTemplate(this.templateId);

    this.builderHeroService.setHeroTemplate(this.templateId);

    this.builderFooterService.footerTheme.next(ActiveNavbarThemes.Default);
    this.builderFooterService.footerTemplate.next(this.templateId);
    this.builderFooterService.setFooterTemplate(this.templateId);
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
