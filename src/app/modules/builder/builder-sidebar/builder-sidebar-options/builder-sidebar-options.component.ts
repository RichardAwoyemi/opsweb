import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-sidebar-options',
  templateUrl: './builder-sidebar-options.component.html'
})
export class BuilderSidebarOptionsComponent implements OnInit, OnDestroy {
  navbarComponent: string = ActiveComponents.Navbar;
  footerComponent: string = ActiveComponents.Footer;
  featuresComponent: string = ActiveComponents.Features;
  heroComponent: string = ActiveComponents.Hero;
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
