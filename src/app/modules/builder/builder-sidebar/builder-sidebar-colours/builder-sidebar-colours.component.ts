import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { ActiveComponents } from 'src/app/modules/builder/builder';

@Component({
  selector: 'app-builder-sidebar-colours',
  templateUrl: './builder-sidebar-colours.component.html',
  styleUrls: ['./builder-sidebar-colours.component.css']
})
export class BuilderSidebarColoursComponent implements OnInit {
  navbar: string = ActiveComponents.Navbar;
  footer: string = ActiveComponents.Footer;
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
