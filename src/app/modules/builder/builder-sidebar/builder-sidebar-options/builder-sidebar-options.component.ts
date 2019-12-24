import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-options',
  templateUrl: './builder-sidebar-options.component.html'
})
export class BuilderSidebarOptionsComponent implements OnInit {
  navbarComponent: string = ActiveComponents.Navbar;
  footerComponent: string = ActiveComponents.Footer;
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
