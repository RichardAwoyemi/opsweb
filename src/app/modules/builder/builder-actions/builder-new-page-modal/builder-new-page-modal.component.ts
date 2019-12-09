import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderActionsService } from '../builder-actions.service';
import { ActiveComponentsFullSelector } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentService } from '../../builder-components/builder.component.service';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-new-page-modal.component.html'
})
export class BuilderNewPageModalComponent implements IModalComponent, OnInit {
  @Input() activePage;
  pageName: string;
  displayError: boolean = false;
  disableSaveButton: boolean = false;
  navbarMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentService,
    private builderActionsService: BuilderActionsService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
      if (response) {
        this.pageComponents = response;
      }
    }));
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();

    this.navbarMenuOptions.push(UtilService.toTitleCase(this.pageName));
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);

    let newPage = {
      'name': UtilService.toTitleCase(this.pageName),
      'components': [
        `${ ActiveComponentsFullSelector.Placeholder }`,
        `${ ActiveComponentsFullSelector.Navbar }`,
        `${ ActiveComponentsFullSelector.Placeholder }`,
        `${ ActiveComponentsFullSelector.Footer }`,
        `${ ActiveComponentsFullSelector.Placeholder }`,
      ]
    };
    this.pageComponents['pages'].push(newPage);
    this.builderComponentService.pageComponents.next(this.pageComponents);

    this.toastrService.success('Your new page has been created.', 'Great!');
  }

  validatePageName() {
    this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }
}
