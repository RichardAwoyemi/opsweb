import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents } from '../../builder';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { TemplateService } from '../../../../shared/services/template.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.css'],
})
export class BuilderSidebarComponentsComponent implements OnInit, OnDestroy {
  searchText: string;
  activeEditComponent: string;
  featuresTemplate: any;
  webComponents: any;
  defaultStyle: any;
  footerTemplate: any;
  navbarTemplate: any;
  heroTemplate: any;
  navbarMenuOptions: any;
  footerMenuOptions: any;

  private activeEditComponentSubscription: Subscription;
  private templateSubscription: Subscription;
  private defaultStyleSubscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  ngOnInit() {
    this.webComponents = BuilderComponentsService.webComponents;

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.templateSubscription = this.builderComponentsService.pageComponents.subscribe(pageComponentsResponse => {
      if (pageComponentsResponse) {
        this.defaultStyleSubscription = this.templateService.getTemplateStyle(pageComponentsResponse['template']).subscribe(response => {
          if (response) {
            this.defaultStyle = response;
          }
        });
      }
    });
  }

  clearActiveComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(null);
    this.builderService.setSidebarComponentsSetting();
  }

  getComponent(componentToAdd: string) {
    let component = {};
    if (Object.keys(ActiveComponents).includes(componentToAdd)) {
      component = this.templateService.getComponent(componentToAdd, this.defaultStyle);
    }
    return component;
  }

  addComponent(component: any) {
    const componentToAdd = this.templateService.getComponent(component.name, this.defaultStyle);
    const activePageIndex = this.builderService.activePageIndex.getValue();
    componentToAdd['componentIndex'] = null;
    this.builderComponentsService.addComponent(componentToAdd, activePageIndex);
  }

  onComponentSelect(component: any) {
    window.postMessage({
      'for': 'opsonion',
      'action': 'component-selected',
      'message': component
    }, '*');
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.templateSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
  }
}
