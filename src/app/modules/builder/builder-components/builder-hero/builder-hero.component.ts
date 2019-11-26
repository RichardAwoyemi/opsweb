import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderHeroService } from './builder-hero.service';
import { ActiveComponents, ActiveSettings } from '../../builder';
import { IComponent } from '../../../../shared/models/component';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-hero.component.html',
  styleUrls: ['./builder-hero.component.css']
})
export class BuilderHeroComponent implements OnInit, IComponent {
  innerHeight: number;
  heroHeadingStyle: any;
  heroImage: string;
  heroImageUrl: string;
  heroSubheadingStyle: any;
  heroButtonStyle: any;
  activeEditComponent: string;
  previewMode: boolean = false;
  componentName: string = ActiveComponents.Hero;
  private activeEditTaskComponentSubscription: Subscription;
  private heroButtonStyleSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private heroImageSubscription: Subscription;
  private previewModeSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderHeroService: BuilderHeroService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.activeEditTaskComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.heroHeadingStyleSubscription = this.builderHeroService.heroHeadingStyle.subscribe(response => {
      if (response) {
        this.heroHeadingStyle = response;
      }
    });

    this.heroButtonStyleSubscription = this.builderHeroService.heroButtonStyle.subscribe(response => {
      if (response) {
        this.heroButtonStyle = response;
      }
    });

    this.heroSubheadingStyleSubscription = this.builderHeroService.heroSubheadingStyle.subscribe(response => {
      if (response) {
        this.heroSubheadingStyle = response;
      }
    });

    this.heroImageSubscription = this.builderHeroService.heroImage.subscribe(response => {
      if (response) {
        this.heroImage = response;
        this.heroImageUrl = `../assets/img/${ response }`;
      }
    });
  }

  setActiveEditComponent() {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setActiveEditSetting(ActiveSettings.Colours);
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
