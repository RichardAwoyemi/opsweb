import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { BuilderActionsService } from '../builder-actions.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-new-page-modal',
  templateUrl: './builder-new-page-modal.component.html'
})
export class BuilderNewPageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePage;
  pageName: string;
  displayError = false;
  disableSaveButton = false;
  navbarMenuOptions: any;
  pageComponents: any;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentsService,
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
    const navbarComponentPosition = this.builderComponentService.getTargetComponentByName(ActiveComponentsPartialSelector.Navbar);
    const footerComponentPosition = this.builderComponentService.getTargetComponentByName(ActiveComponentsPartialSelector.Footer);
    const navbarComponent = this.builderComponentService.getComponent(navbarComponentPosition[0]['activePageIndex'], navbarComponentPosition[0]['activeComponentIndex']);
    const footerComponent = this.builderComponentService.getComponent(footerComponentPosition[0]['activePageIndex'], footerComponentPosition[0]['activeComponentIndex']);
    navbarComponent['timestamp'] = new Date().getTime();
    footerComponent['timestamp'] = new Date().getTime();

    let tempPageComponents = [
      navbarComponent,
      footerComponent,
    ];
    tempPageComponents = BuilderComponentsService.addPlaceholdersOnSinglePage(tempPageComponents);

    const pageComponents = {};
    pageComponents['name'] = this.pageName;
    pageComponents['components'] = tempPageComponents;
    this.pageComponents['pages'].push(pageComponents);
    this.builderComponentService.pageComponents.next(this.pageComponents);

    this.navbarMenuOptions.push(UtilService.toTitleCase(this.pageName));
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);
    this.builderComponentService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', this.navbarMenuOptions);
    this.toastrService.success('Your new page has been created.', 'Great!');
  }

  validatePageName() {
    this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
