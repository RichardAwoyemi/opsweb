import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderFeaturesService } from '../../builder-components/builder-features/builder-features.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../builder-components/builder-footer/builder-footer.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.css'],
})
export class BuilderSidebarComponentsComponent implements OnInit, OnDestroy {
  searchText: string;
  activeEditComponent: string;
  defaultFeaturesStyle: any;
  featuresTemplate: any;
  webComponents: any;
  defaultFooterStyle: any;
  footerTemplate: any;
  navbarTemplate: any;

  private activeEditComponentSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService,
    private builderFooterService: BuilderFooterService,
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

    this.navbarTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(pageComponentsResponse => {
      if (pageComponentsResponse) {
        this.navbarTemplate = pageComponentsResponse['template'];
      }
    });

    this.featuresTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(pageComponentsResponse => {
      if (pageComponentsResponse) {
        this.featuresTemplate = pageComponentsResponse['template'];
      } else {
        this.featuresTemplate = ActiveTemplates.Default;
      }
      this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(response => {
        if (response) {
          this.defaultFeaturesStyle = {
            'featuresStyle': response['featuresStyle'],
            'featuresHeadingStyle': response['featuresHeadingStyle'],
            'featuresSubheadingStyle': response['featuresSubheadingStyle'],
          };
        }
      });
    });

    this.footerTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(pageComponentsResponse => {
      if (pageComponentsResponse) {
        this.footerTemplate = pageComponentsResponse['template'];
      } else {
        this.footerTemplate = ActiveTemplates.Default;
      }
      this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
        if (response) {
          this.defaultFooterStyle = {
            'footerStyle': response['footerStyle'],
            'footerSocialLinksContainerStyle': response['footerSocialLinksContainerStyle'],
            'footerSocialLinksStyle': response['footerSocialLinksStyle'],
            'footerPageLinksStyle': response['footerPageLinksStyle'],
            'footerCopyrightStyle': response['footerCopyrightStyle'],
          };
        }
      });
    });
  }

  clearActiveComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(null);
    this.builderService.setSidebarComponentsSetting();
  }

  getComponent(componentToAdd: string) {
    let component = {};
    switch (componentToAdd) {
      case ActiveComponentsPartialSelector.Navbar:
        component = {
          'componentIndex': null,
          'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
          'componentName': ActiveComponentsPartialSelector.Navbar,
          'timestamp': new Date().getTime()
        };
        break;
      case ActiveComponentsPartialSelector.Hero:
        component = {
          'componentIndex': null,
          'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
          'componentName': ActiveComponentsPartialSelector.Hero,
          'timestamp': new Date().getTime()
        };
        break;
      case ActiveComponentsPartialSelector.Footer:
        component = {
          'componentIndex': null,
          'componentId': `${ActiveComponents.Footer}-${UtilService.generateRandomString(8)}`,
          'componentName': ActiveComponentsPartialSelector.Footer,
          'componentDetail': this.defaultFooterStyle,
          'timestamp': new Date().getTime()
        };
        break;
      case ActiveComponentsPartialSelector.Features:
        component = {
          'componentIndex': null,
          'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
          'componentName': ActiveComponentsPartialSelector.Features,
          'componentDetail': this.defaultFeaturesStyle,
          'timestamp': new Date().getTime()
        };
        break;
    }
    return component;
  }

  addComponent(component: any) {
    const tempComponentToAdd = this.getComponent(component.selector);
    const activePageIndex = this.builderService.activePageIndex.getValue();
    const componentToAdd = tempComponentToAdd['componentDetail'];
    componentToAdd['componentIndex'] = tempComponentToAdd['componentIndex'];
    componentToAdd['componentId'] = tempComponentToAdd['componentId'];
    componentToAdd['componentName'] = tempComponentToAdd['componentName'];
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
    this.featuresTemplateSubscription.unsubscribe();
    this.defaultFeaturesStyleSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.navbarTemplateSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
  }
}
