import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-layout',
  templateUrl: './builder-sidebar-layout.component.html'
})
export class BuilderSidebarLayoutComponent implements OnInit, OnDestroy {
  navbarComponent: string = ActiveComponents.Navbar;
  heroComponent: string = ActiveComponents.Hero;
  footerComponent: string = ActiveComponents.Footer;
  featuresComponent: string = ActiveComponents.Features;
  headingComponent: string = ActiveComponents.Heading;
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

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
  }
}
