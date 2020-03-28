import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { ToastrService } from 'ngx-toastr';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../builder';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html'
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit, OnDestroy {

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService
  ) {
  }

  @Input() componentId;
  pageComponents: any;
  components: any;
  activePage: string;
  activePageIndex: number;

  private pageComponentsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;

  ngOnInit() {
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageSettingsResponse => {
      if (activePageSettingsResponse) {
        this.activePage = activePageSettingsResponse;
        this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((response => {
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

  ngOnDestroy() {
    this.activePageSettingSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
