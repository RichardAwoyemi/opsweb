import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderService } from '../../builder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-delete-component-modal',
  templateUrl: './builder-delete-component-modal.component.html'
})
export class BuilderDeleteComponentModalComponent implements IModalComponent, OnInit, OnDestroy {
  activePage: string;
  activePageIndex: number;
  pageComponents: any;
  private activeComponentIndex: number;
  private components: Array<string>;

  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;
  private activeComponentIndexSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private builderComponentService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.activeComponentIndexSubscription = this.builderComponentService.activeComponentIndex.subscribe((response => {
      if (response) {
        this.activeComponentIndex = response;
      }
    }));

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePage = activePageSettingResponse;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] === this.activePage) {
                this.components = response['pages'][i]['components'];
                this.activePageIndex = i;
              }
            }
          }
        }));
      }
    }));
  }

  onConfirmButtonClick() {
    this.components.splice(this.activeComponentIndex, 1);

    const componentsArrayWithoutPlaceholders = [];
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i]['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
        componentsArrayWithoutPlaceholders.push(this.components[i]);
      }
    }

    const componentsArrayWithPlaceholders = componentsArrayWithoutPlaceholders.reduce((r, a) => r.concat(a,
      {
        componentIndex: null,
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        timestamp: new Date().getTime()
      }),

      [{
        componentIndex: null,
        componentName: ActiveComponentsPartialSelector.Placeholder,
        componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
        timestamp: new Date().getTime()
      }]
    );
    for (let i = 0; i < componentsArrayWithPlaceholders.length; i++) {
      componentsArrayWithPlaceholders[i]['componentIndex'] = i;
    }

    this.components = componentsArrayWithPlaceholders;
    this.pageComponents['pages'][this.activePageIndex]['components'] = this.components;

    this.builderComponentService.pageComponents.next(this.pageComponents);
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
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
    this.activeComponentIndexSubscription.unsubscribe();
  }
}
