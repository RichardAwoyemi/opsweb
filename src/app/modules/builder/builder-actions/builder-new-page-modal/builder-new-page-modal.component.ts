import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IModalComponent } from '../../../../shared/models/modal';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';
import { TemplateService } from '../../../../shared/services/template.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderActionsService } from '../builder-actions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  footerMenuOptions: any;
  pageComponents: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private templateService: TemplateService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;

    this.builderNavbarService.navbarMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarMenuOptions = response;
        }
      });

    this.builderFooterService.footerMenuOptions.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.footerMenuOptions = response;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response => {
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
    const tempPageComponents = [];
    const singleComponentPerPage = ['Navbar', 'Footer'];
    let componentIndex = 1;

    for (let index = 0; index < singleComponentPerPage.length; index++) {
      const componentName = singleComponentPerPage[index];
      if (this.builderComponentsService.checkIfComponentExists(ActiveComponentsPartialSelector[componentName])) {
        const componentNameLower = componentName.toLowerCase();
        const position = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector[componentName])[0];
        const component = this.pageComponents['pages'][position['activePageIndex']]['components'][position['activeComponentIndex']];
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
