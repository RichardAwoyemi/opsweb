import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from '../../../../shared/services/template.service';
import { ActiveComponents, ActiveSettings, ActiveComponentsPartialSelector } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderService } from '../../builder.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.css'],
})
export class BuilderSidebarComponentsComponent implements OnInit, OnDestroy {
  searchText: string;
  activeEditComponent: string;
  webComponents = [];
  defaultStyle: any;
  navbarMenuOptions: any;
  footerMenuOptions: any;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  ngOnInit() {
    Object.keys(ActiveComponents).map(key => {
      if (key !== 'Placeholder') {
        this.webComponents.push(
          {
            'name': UtilService.toTitleCase(ActiveComponents[key]),
            'selector': ActiveComponentsPartialSelector[key]
          }
        );
      }
    });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(pageComponentsResponse => {
        if (pageComponentsResponse) {
          this.templateService.getTemplateStyle(pageComponentsResponse['template']).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.defaultStyle = response;
              }
            });
        }
      });
  }

  clearActiveComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
