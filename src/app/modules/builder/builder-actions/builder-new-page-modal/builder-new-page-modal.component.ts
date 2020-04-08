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
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { Template } from '../../../../shared/models/template';
import { TemplateService } from '../../../../shared/services/template.service';

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
  activeTemplate: any;
  footerMenuOptions: any;

  private activeTemplateSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private pageComponentsSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private templateService: TemplateService,
    private builderComponentsService: BuilderComponentsService,
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

    this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
      if (response) {
        this.footerMenuOptions = response;
      }
    });

    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((response => {
      if (response) {
        this.pageComponents = response;
      }
    }));

    this.activeTemplateSubscription = this.templateService.getTemplateStyle(this.pageComponents['template']).subscribe(response => {
      if (response) {
        this.activeTemplate = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    let tempPageComponents = [];
    const singleComponentPerPage = ['Navbar', 'Footer'];
    let componentIndex = 1;

    for (let index = 0; index < singleComponentPerPage.length; index++) {
      const componentName = singleComponentPerPage[index];
      if (this.builderComponentsService.checkIfComponentExists(ActiveComponentsPartialSelector[componentName])) {
        const componentNameLower = componentName.toLowerCase();
        const position = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector[componentName])[0];
        let component = this.pageComponents['pages'][position['activePageIndex']]['components'][position['activeComponentIndex']];
        component['componentIndex'] = componentIndex;
        const menuOptions = this[`get${componentName}MenuOptions`]();
        this[`${componentNameLower}MenuOptions`].push(menuOptions);
        component[`${componentNameLower}MenuOptions`] = this[`${componentNameLower}MenuOptions`];
        tempPageComponents.push(component);
        componentIndex = componentIndex + 2;
      }
    }

    const pageComponents = { pages: [{ name: UtilService.titleCase(this.pageName), components: tempPageComponents }] };
    const newPage = this.templateService.generatePagePlaceholders(pageComponents);
    this.pageComponents['pages'].push(newPage['pages'][0]);
    this.builderComponentsService.pageComponents.next(this.pageComponents);
    this.toastrService.success('Your new page has been created.', 'Great!');
  }

  getFooterMenuOptions(): any {
    return { 'page': UtilService.toTitleCase(this.pageName), 'visible': false };
  }

  getNavbarMenuOptions(): any {
    return UtilService.toTitleCase(this.pageName);
  }

  validatePageName() {
    this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }

  ngOnDestroy() {
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
    this.activeTemplateSubscription.unsubscribe();
  }
}
