import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../builder';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { BuilderService } from '../../builder.service';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { WebsiteService } from '../../../../shared/services/website.service';

@Component({
  selector: 'app-builder-showcase-layout',
  templateUrl: './builder-showcase-layout.component.html',
  styleUrls: ['./builder-showcase-layout.component.css']
})
export class BuilderShowcaseLayoutComponent implements OnInit, OnDestroy {
  builderComponents = [];
  options: SortablejsOptions;
  activeEditComponent: string;
  pageComponents: any;
  websiteLoaded = false;
  activePage = 'Home';
  private activeEditComponentSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;
  private websiteLoadedSubscription: Subscription;

  constructor(
    private builderComponentService: BuilderComponentsService,
    private simpleModalService: SimpleModalService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
    this.options = {
      onUpdate: function (e: any) {
        const tempUnorderedComponentsArrayWithoutPlaceholders = BuilderComponentsService.getUnorderedComponentsArrayWithoutPlaceholders(e);
        const tempOrderedComponentsArrayWithPlaceholders = BuilderComponentsService.getOrderedComponentsArrayWithPlaceholders(tempUnorderedComponentsArrayWithoutPlaceholders);
        window.postMessage({
          'for': 'opsonion',
          'action': 'recycle-showcase',
          'data': tempOrderedComponentsArrayWithPlaceholders
        }, '*');
      }
    };
  }

  ngOnInit() {
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageResponse => {
      if (activePageResponse) {
        this.activePage = activePageResponse;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            this.setPageComponents();
            this.builderComponentService.addComponentsToSessionStorage(this.pageComponents, this.activePage);
          }
        }));
      }
    }));

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.websiteLoadedSubscription = this.websiteService.websiteLoaded.subscribe(response => {
      if (response) {
        this.websiteLoaded = response;
      }
    });
  }

  setPageComponents() {
    let tempBuilderComponents = null;
    this.builderComponents = [];
    this.builderComponentService.activeComponentIndex.next(null);

    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] === this.activePage) {
        tempBuilderComponents = this.pageComponents['pages'][i]['components'];
      }
    }

    for (let j = 0; j < tempBuilderComponents.length; j++) {
      this.builderComponents.push(`<${tempBuilderComponents[j]['componentName']} id='${tempBuilderComponents[j]['componentId']}'/><${tempBuilderComponents[j]['componentName']}>`);
    }
  }

  builderComponentSelected(componentIndex) {
    this.builderComponentService.activeComponentIndex.next(componentIndex);
  }

  addComponent(tempComponent) {
    const activePageIndex = BuilderComponentsService.getActivePageIndex(this.pageComponents, tempComponent);
    const activeComponentIndex = BuilderComponentsService.getActiveComponentIndex(this.pageComponents, tempComponent);
    if (tempComponent['componentDetail']) {
      let component = BuilderComponentsService.setupComponent(tempComponent);
      if (component['componentName'] === ActiveComponentsPartialSelector.Features) {
        component = BuilderComponentsService.setupFeaturesComponent(component, tempComponent);
      }
      this.pageComponents['pages'][activePageIndex]['components'].splice(activeComponentIndex, 0, component);
      const componentsArrayWithoutPlaceholders = BuilderComponentsService.removePlaceholders(this.pageComponents['pages'][activePageIndex]['components']);
      this.pageComponents['pages'][activePageIndex]['components'] = BuilderComponentsService.addPlaceholders(componentsArrayWithoutPlaceholders);
      this.builderComponentService.pageComponents.next(this.pageComponents);
      this.sessionStorageService.setItem('components', JSON.stringify(this.pageComponents));
    }
  }

  recycleShowcase(components) {
    this.builderComponents = [];
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(null);
    this.builderService.activeElement.next(null);
    this.builderComponentService.activeComponentIndex.next(null);
    this.builderService.setSidebarComponentsSetting();

    let pageIndex = null;
    for (let i = 0; i < components.length; i++) {
      this.builderComponents.push(`<${components[i]['componentName']} id='${components[i]['componentId']}'/><${components[i]['componentName']}>`);
      for (let j = 0; j < this.pageComponents['pages'].length; j++) {
        if (this.pageComponents['pages'][j]['name'] === this.activePage) {
          pageIndex = j;
          for (let k = 0; k < this.pageComponents['pages'][j]['components'].length; k++) {
            if (components[i]['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
              if (this.pageComponents['pages'][j]['components'][k]['componentId'] === components[i]['componentId']) {
                this.pageComponents['pages'][j]['components'][k]['componentIndex'] = components[i]['componentIndex'];
              }
            }
          }
          this.sessionStorageService.setItem('components', JSON.stringify(this.pageComponents['pages'][j]['components']));
        }
      }
    }

    this.pageComponents['pages'][pageIndex]['components'].sort(function (a, b) {
      return a['componentIndex'] - b['componentIndex'];
    });

    this.builderComponentService.pageComponents.next(this.pageComponents);
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for === 'opsonion') {
      switch (e.data.action) {
        case 'component-added':
          this.addComponent(e.data.message);
          break;
        case 'recycle-showcase':
          this.recycleShowcase(e.data.data);
          break;
        case 'component-exists':
          this.simpleModalService.displayMessage('Oops!', 'This component cannot be added twice to a single page.');
          break;
        case 'delete-component':
          this.modalService.open(BuilderDeleteComponentModalComponent, {windowClass: 'modal-holder', centered: true});
          break;
      }
      this.builderService.processIncomingMessages(e, this.activeEditComponent);
    }
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.websiteLoadedSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
