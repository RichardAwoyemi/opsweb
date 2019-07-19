import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-layout',
  templateUrl: './builder-sidebar-layout.component.html',
  styleUrls: ['./builder-sidebar-layout.component.css']
})
export class BuilderSidebarLayoutComponent implements OnInit {
  componentName: string = ActiveComponents.Navbar;
  activeEditComponent: string;
  private activeEditComponentSubscription: Subscription;

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
}
