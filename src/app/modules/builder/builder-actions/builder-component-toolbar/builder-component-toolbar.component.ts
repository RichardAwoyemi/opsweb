import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderDeleteComponentModalComponent } from '../builder-delete-component-modal/builder-delete-component-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-component-toolbar',
  templateUrl: './builder-component-toolbar.component.html'
})
export class BuilderComponentToolbarComponent implements OnInit, OnDestroy {
  @Input() componentName;
  @Input() componentId;
  activeEditComponent: string;
  activeEditComponentId: string;
  activeRoute: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });
    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.activeEditComponentId = response;
      });
  }

  deleteComponent() {
    const modal = this.modalService.open(BuilderDeleteComponentModalComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modal.componentInstance.componentId = this.activeEditComponentId;
  }

  toggleComponentToolbarVisibility() {
    if (this.activeEditComponent === this.componentName && this.activeEditComponentId === this.componentId) {
      return (this.activeEditComponent === this.componentName && this.activeRoute !== '/preview') ||
        (this.activeEditComponentId === this.componentId && this.activeRoute !== '/preview');
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
