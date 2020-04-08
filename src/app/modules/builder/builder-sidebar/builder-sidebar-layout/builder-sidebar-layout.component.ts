import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
