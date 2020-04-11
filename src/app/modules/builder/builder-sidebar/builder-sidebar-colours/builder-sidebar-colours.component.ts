import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from 'src/app/modules/builder/builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-colours',
  templateUrl: './builder-sidebar-colours.component.html',
  styleUrls: ['./builder-sidebar-colours.component.css']
})
export class BuilderSidebarColoursComponent implements OnInit, OnDestroy {
  navbar: string = ActiveComponents.Navbar;
  footer: string = ActiveComponents.Footer;
  features: string = ActiveComponents.Features;
  hero: string = ActiveComponents.Hero;
  activeEditComponent: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
