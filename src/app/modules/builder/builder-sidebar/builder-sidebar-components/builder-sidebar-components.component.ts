import { Component, OnInit } from '@angular/core';
import { ActiveComponents, ActiveComponentsFullSelector } from '../../builder';
import { UtilService } from '../../../../shared/services/util.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-components',
  templateUrl: './builder-sidebar-components.component.html',
  styleUrls: ['./builder-sidebar-components.component.css'],
})
export class BuilderSidebarComponentsComponent implements OnInit {
  webComponents = [
    {
      'name': UtilService.toTitleCase(ActiveComponents.Navbar),
      'selector': ActiveComponentsFullSelector.Navbar
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Hero),
      'selector': ActiveComponentsFullSelector.Hero
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Footer),
      'selector': ActiveComponentsFullSelector.Footer
    },
    {
      'name': UtilService.toTitleCase(ActiveComponents.Features),
      'selector': ActiveComponentsFullSelector.Features
    }
  ];
  searchText: string;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponent: string;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  clearActiveComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }
}
