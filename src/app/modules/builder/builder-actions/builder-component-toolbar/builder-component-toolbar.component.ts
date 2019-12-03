import { Component, HostListener, Input, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderDeleteComponentModalComponent } from '../builder-delete-component-modal/builder-delete-component-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder-component-toolbar',
  templateUrl: './builder-component-toolbar.component.html'
})
export class BuilderComponentToolbarComponent implements OnInit {
  @Input() componentName;
  @Input() componentId;
  activeEditComponent: string;
  activeEditComponentId: string;
  activeRoute: string;
  private activeEditComponentSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.activeRoute = this.router.url;
    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  deleteComponent() {
    this.modalService.open(BuilderDeleteComponentModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  toggleComponentToolbarVisibility() {
    if (this.activeEditComponent === this.componentName || this.activeEditComponentId) {
      return (this.activeEditComponent === this.componentName && this.activeRoute != '/preview') ||
        (this.activeEditComponentId === this.componentId && this.activeRoute != '/preview');
    } else {
      return false;
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if (e.data.action == 'unique-component-selected') {
        this.activeEditComponentId = null;
      }
      if (e.data.action == 'duplicate-component-selected') {
        this.activeEditComponentId = e.data.message;
      }
    }
  }
}
