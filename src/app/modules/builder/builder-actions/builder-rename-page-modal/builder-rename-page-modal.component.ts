import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderActionsService } from '../builder-actions.service';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderService } from '../../builder.service';
import { BuilderComponentService } from '../../builder-components/builder.component.service';

@Component({
  selector: 'app-builder-rename-page-modal',
  templateUrl: './builder-rename-page-modal.component.html'
})
export class BuilderRenamePageModalComponent implements IModalComponent {
  @Input() activePage: string;
  @Input() activePageIndex: number;
  pageName: string;
  displayError: boolean = false;
  disableSaveButton: boolean = false;
  navbarMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentService,
    private builderNavbarService: BuilderNavbarService
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

  onConfirmButtonClick() {
    this.activeModal.dismiss();

    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] == this.activePage) {
        this.pageComponents['pages'][i]['name'] = UtilService.toTitleCase(this.pageName);
      }
    }
    this.builderComponentService.pageComponents.next(this.pageComponents);

    for (let i = 0; i < this.navbarMenuOptions.length; i++) {
      if (i === this.activePageIndex) {
        this.navbarMenuOptions[i] = UtilService.toTitleCase(this.pageName);
      }
    }
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);

    this.builderService.activePageSetting.next(UtilService.toTitleCase(this.pageName));

    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName() {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
