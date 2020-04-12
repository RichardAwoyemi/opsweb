import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { TemplateService } from '../../../../shared/services/template.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderActionsService } from '../builder-actions.service';

@Component({
  selector: 'app-builder-new-page-modal',
  templateUrl: './builder-new-page-modal.component.html'
})
export class BuilderNewPageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() activePage;
  pageName: string;
  displayError = false;
  disableSaveButton = false;
  pageComponents: any;
  pages: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe((response => {
      if (response) {
        this.pageComponents = response;
        this.pages = this.builderComponentsService.getPages();
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
        const position = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector[componentName])[0];
        const component = this.pageComponents['pages'][position['activePageIndex']]['components'][position['activeComponentIndex']];
        component['componentIndex'] = componentIndex;
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
    this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.pages);
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.pages);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
