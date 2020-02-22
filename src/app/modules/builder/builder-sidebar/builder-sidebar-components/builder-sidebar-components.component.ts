import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderFeaturesService } from '../../builder-components/builder-features/builder-features.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.css'],
})
export class BuilderSidebarComponentsComponent implements OnInit, OnDestroy {
  webComponents = [
    {
      'name': UtilService.toTitleCase(ActiveComponents.Navbar),
      'selector': ActiveComponentsPartialSelector.Navbar
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Hero),
      'selector': ActiveComponentsPartialSelector.Hero
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Footer),
      'selector': ActiveComponentsPartialSelector.Footer
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Features),
      'selector': ActiveComponentsPartialSelector.Features
    }
  ];
  searchText: string;
  activeEditComponent: string;

  defaultFeaturesStyle: any;
  featuresTemplate: any;

  private activeEditComponentSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(featuresTemplateResponse => {
      if (featuresTemplateResponse) {
        this.featuresTemplate = featuresTemplateResponse;
        this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = {
              'featuresStyle': response['featuresStyle'],
              'featuresHeadingStyle': response['featuresHeadingStyle'],
              'featuresSubheadingStyle': response['featuresSubheadingStyle'],
            };
          }
        });
      } else {
        this.featuresTemplate = ActiveTemplates.Default;
        this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(ActiveTemplates.Default).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = {
              'featuresStyle': response['featuresStyle'],
              'featuresHeadingStyle': response['featuresHeadingStyle'],
              'featuresSubheadingStyle': response['featuresSubheadingStyle'],
            };
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
          'componentId': `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`,
          'componentName': ActiveComponentsPartialSelector.Footer,
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
    return JSON.stringify(component);
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.defaultFeaturesStyleSubscription.unsubscribe();
  }
}
