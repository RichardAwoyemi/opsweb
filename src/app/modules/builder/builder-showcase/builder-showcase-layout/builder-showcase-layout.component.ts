import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../builder';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { BuilderService } from '../../builder.service';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../../shared/services/util.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';

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
  activePage = 'Home';
  private activeEditComponentSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

  constructor(
    private builderComponentService: BuilderComponentsService,
    private simpleModalService: SimpleModalService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
    private builderService: BuilderService
  ) {
    function getUnorderedComponentsArrayWithoutPlaceholders(e: any) {
      const tempUnorderedComponentsArrayWithoutPlaceholders = [];
      for (let i = 0; i < e.target.children.length; i++) {
        const componentName = e.target.children[i].children[0].children[0].localName;
        const componentId = e.target.children[i].children[0].children[0].id;
        const component = {
          componentName: componentName,
          componentId: componentId,
          componentIndex: null
        };
        if (component['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
          tempUnorderedComponentsArrayWithoutPlaceholders.push(component);
        }
      }
      return tempUnorderedComponentsArrayWithoutPlaceholders;
    }

    function getOrderedComponentsArrayWithPlaceholders(tempUnorderedComponentsArrayWithoutPlaceholders) {
      const tempUnorderedComponentsArrayWithPlaceholders = tempUnorderedComponentsArrayWithoutPlaceholders.reduce((r, a) => r.concat(a,
        {
          componentName: ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          componentIndex: null,
          timestamp: new Date().getTime()
        }),

        [{
          componentName: ActiveComponentsPartialSelector.Placeholder,
          componentId: `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`,
          componentIndex: null,
          timestamp: new Date().getTime()
        }]
      );

      const tempOrderedComponentsArrayWithPlaceholders = [];
      for (let i = 0; i < tempUnorderedComponentsArrayWithPlaceholders.length; i++) {
        const component = {
          componentName: tempUnorderedComponentsArrayWithPlaceholders[i]['componentName'],
          componentId: tempUnorderedComponentsArrayWithPlaceholders[i]['componentId'],
          componentIndex: i,
          timestamp: new Date().getTime()
        };
        tempOrderedComponentsArrayWithPlaceholders.push(component);
      }
      return tempOrderedComponentsArrayWithPlaceholders;
    }

    this.options = {
      onUpdate: function (e: any) {
        const tempUnorderedComponentsArrayWithoutPlaceholders = getUnorderedComponentsArrayWithoutPlaceholders(e);
        const tempOrderedComponentsArrayWithPlaceholders = getOrderedComponentsArrayWithPlaceholders(tempUnorderedComponentsArrayWithoutPlaceholders);
        window.postMessage({
          'for': 'opsonion',
          'action': 'recycle-showcase',
          'data': tempOrderedComponentsArrayWithPlaceholders
        }, '*');
      }
    };
  }

  static addFeaturesComponent(component, componentToAdd) {
    component['featuresStyle'] = componentToAdd['componentDetail']['featuresStyle'];
    component['featuresHeadingStyle'] = componentToAdd['componentDetail']['featuresHeadingStyle'];
    component['featuresSubheadingStyle'] = componentToAdd['componentDetail']['featuresSubheadingStyle'];
    component['featuresItemArray'] = [
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Building a website has never been easier than this! Get started today, free of cost.'
      },
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Make our amazing library of templates and themes your own with our extensive range of custom options.'
      },
      {
        'heading': UtilService.generateRandomWord(),
        'subheading': 'Grow with ease and whilst receiving useful analytics. Its just what you need to blossom.'
      }
    ];
    return component;
  }

  ngOnInit() {
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((activePageResponse => {
      if (activePageResponse) {
        this.activePage = activePageResponse;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            this.setPageComponents();
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] === this.activePage) {
                this.sessionStorageService.setItem('components', JSON.stringify(response['pages'][i]['components']));
              }
            }
          }
        }));
      }
    }));

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
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

  addComponent(componentToAdd) {
    let activePageIndex = null;
    let activeComponentIndex = null;
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
        if (this.pageComponents['pages'][i]['components'][j]['componentId'] === componentToAdd['nearestComponentId']) {
          activePageIndex = i;
          activeComponentIndex = j;
        }
      }
    }

    if (componentToAdd['componentDetail']) {
      let component = {
        'componentIndex': componentToAdd['componentIndex'],
        'componentId': componentToAdd['componentId'],
        'componentName': componentToAdd['componentName'],
        'timestamp': componentToAdd['timestamp']
      };
      if (component['componentName'] === ActiveComponentsPartialSelector.Features) {
        component = BuilderShowcaseLayoutComponent.addFeaturesComponent(component, componentToAdd);
      }
      this.pageComponents['pages'][activePageIndex]['components'].splice(activeComponentIndex, 0, component);

      const componentsArrayWithoutPlaceholders = [];
      for (let i = 0; i < this.pageComponents['pages'][activePageIndex]['components'].length; i++) {
        if (this.pageComponents['pages'][activePageIndex]['components'][i]['componentName'] !== ActiveComponentsPartialSelector.Placeholder) {
          componentsArrayWithoutPlaceholders.push(this.pageComponents['pages'][activePageIndex]['components'][i]);
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

      this.pageComponents['pages'][activePageIndex]['components'] = componentsArrayWithPlaceholders;
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
      if (e.data.action === 'component-added') {
        this.addComponent(e.data.message);
      }
      if (e.data.action === 'recycle-showcase') {
        this.recycleShowcase(e.data.data);
      }
      if (e.data.action === 'component-exists') {
        this.simpleModalService.displayMessage('Oops!', 'This component cannot be added twice to a single page.');
      }
      if (e.data.action === 'delete-component') {
        this.modalService.open(BuilderDeleteComponentModalComponent, {windowClass: 'modal-holder', centered: true});
      }
      this.builderService.processIncomingMessages(e, this.activeEditComponent);
    }
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.pageComponentsSubscription.unsubscribe();
  }
}
