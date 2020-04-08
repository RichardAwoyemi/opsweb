import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html'
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit, OnDestroy {

  @Input() componentId;
  pageComponents: any;
  components: any;
  activePage: string;
  activePageIndex: number;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((activePageSettingsResponse => {
      if (activePageSettingsResponse) {
        this.activePage = activePageSettingsResponse;
        this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] === this.activePage) {
                this.activePageIndex = i;
                this.components = this.pageComponents['pages'][i]['components'].filter(function (a) {
                  return a['componentName'] !== ActiveComponentsPartialSelector.Placeholder;
                });
              }
            }
          }
        }));
      }
    }));
  }

  onConfirmButtonClick() {
    let pageComponents = this.builderComponentsService.pageComponents.getValue();

    if (BuilderComponentsService.isComponent(ActiveComponents.Navbar, this.componentId) === true) {
      const components = this.builderComponentsService.deleteComponentByName(ActiveComponentsPartialSelector.Navbar);
      pageComponents = BuilderComponentsService.updateComponents(components, pageComponents);
    }
    if (BuilderComponentsService.isComponent(ActiveComponents.Hero, this.componentId) === true) {
      const components = this.builderComponentsService.deleteComponentByName(ActiveComponentsPartialSelector.Hero);
      pageComponents = BuilderComponentsService.updateComponents(components, pageComponents);
    }
    if (BuilderComponentsService.isComponent(ActiveComponents.Features, this.componentId) === true) {
      let components = BuilderComponentsService.deleteComponentById(this.components, this.componentId);
      components = BuilderComponentsService.addPlaceholdersOnSinglePage(components);
      pageComponents['pages'][this.activePageIndex]['components'] = components;
    }
    if (BuilderComponentsService.isComponent(ActiveComponents.Footer, this.componentId) === true) {
      const components = this.builderComponentsService.deleteComponentByName(ActiveComponentsPartialSelector.Footer);
      pageComponents = BuilderComponentsService.updateComponents(components, pageComponents);
    }

    this.builderComponentsService.pageComponents.next(pageComponents);
    this.builderService.setSidebarComponentsSetting();
    this.toastrService.success('Your component has been deleted.', 'Great!');
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
