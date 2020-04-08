import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsOptions } from 'ngx-sortablejs';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveElements, ActiveSettings } from '../../builder';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private simpleModalService: SimpleModalService,
    private sessionStorageService: StorageService,
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
    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((activePageResponse => {
      if (activePageResponse) {
        this.activePage = activePageResponse;
        this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response => {
          if (response) {
            this.pageComponents = response;
            this.setPageComponents();
            BuilderComponentsService.addComponentsToSessionStorage(this.pageComponents, this.activePage);
          }
        }));
      }
    }));

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.websiteService.websiteLoaded.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.websiteLoaded = response;
      }
    });
  }

  setPageComponents() {
    let tempBuilderComponents = null;
    this.builderComponents = [];
    this.builderComponentsService.activeComponentIndex.next(null);

    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] === this.activePage) {
        tempBuilderComponents = this.pageComponents['pages'][i]['components'];
      }
    }

    if (tempBuilderComponents) {
      for (let j = 0; j < tempBuilderComponents.length; j++) {
        this.builderComponents.push(`<${tempBuilderComponents[j]['componentName']} id='${tempBuilderComponents[j]['componentId']}'/><${tempBuilderComponents[j]['componentName']}>`);
      }
    }
  }

  builderComponentSelected(componentIndex) {
    this.builderComponentsService.activeComponentIndex.next(componentIndex);
  }

  recycleShowcase(components) {
    this.builderComponents = [];
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(null);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderComponentsService.activeComponentIndex.next(null);
    this.builderService.setActiveEditSetting(ActiveSettings.Components);
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
          StorageService.setItem('components', JSON.stringify(this.pageComponents['pages'][j]['components']));
        }
      }
    }

    this.pageComponents['pages'][pageIndex]['components'].sort(function (a, b) {
      return a['componentIndex'] - b['componentIndex'];
    });

    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for === 'opsonion') {
      switch (e.data.action) {
        case 'component-added':
          this.builderComponentsService.addComponent(e.data.message);
          break;
        case 'recycle-showcase':
          this.recycleShowcase(e.data.data);
          break;
        case 'component-exists':
          this.simpleModalService.displayMessage('Oops!', 'This component cannot be added twice to a single page.');
          break;
        case 'delete-component':
          this.modalService.open(BuilderDeleteComponentModalComponent, { windowClass: 'modal-holder', centered: true });
          break;
        case 'component-error':
          this.simpleModalService.displayMessage('Oops!', 'This item is not a valid component.');
          break;
      }
      this.builderService.processIncomingMessages(e);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
