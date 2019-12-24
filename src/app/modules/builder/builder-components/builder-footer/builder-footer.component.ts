import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveFooterThemes, ActiveSettings, ActiveTemplates } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { BuilderFooterService } from './builder-footer.service';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-footer.component.html',
  styleUrls: ['./builder-footer.component.css']
})
export class BuilderFooterComponent implements OnInit, IComponent {
  componentName: string = ActiveComponents.Footer;
  innerHeight: number;
  activeEditComponent: string;
  today: number = Date.now();
  previewMode: boolean;
  footerStyle: any;

  private footerStyleSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerTemplateSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.footerThemeSubscription = this.builderFooterService.footerTheme.subscribe(response => {
      if (!response) {
        this.builderFooterService.footerTheme.next(ActiveFooterThemes.Default);
        this.builderFooterService.setFooterTemplate(ActiveTemplates.Default);
      }
    });

    this.footerTemplateSubscription = this.builderFooterService.footerTemplate.subscribe(response => {
      if (!response) {
        this.builderFooterService.footerTemplate.next(ActiveFooterThemes.Default);
      }
    });
  }

  setActiveEditComponent() {
    if (this.activeEditComponent == ActiveComponents.Footer) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Footer);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }
}
