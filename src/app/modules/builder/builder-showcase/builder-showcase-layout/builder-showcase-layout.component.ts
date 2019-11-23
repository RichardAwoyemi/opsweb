import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderComponentService } from '../../builder-components/builder.component.service';
import { ActiveComponentsFullSelector } from '../../builder';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { SessionStorageService } from '../../../../shared/services/session-storage.service';
import { SortablejsOptions } from 'ngx-sortablejs';
import { BuilderService } from '../../builder.service';
import { BuilderDeleteComponentModalComponent } from '../../builder-actions/builder-delete-component-modal/builder-delete-component-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-builder-showcase-layout',
  templateUrl: './builder-showcase-layout.component.html',
  styleUrls: ['./builder-showcase-layout.component.css']
})
export class BuilderShowcaseLayoutComponent implements OnInit {
  builderComponents: string[] = [
    `${ ActiveComponentsFullSelector.Placeholder }`,
    `${ ActiveComponentsFullSelector.Navbar }`,
    `${ ActiveComponentsFullSelector.Placeholder }`,
    `${ ActiveComponentsFullSelector.Footer }`,
    `${ ActiveComponentsFullSelector.Placeholder }`,
  ];
  options: SortablejsOptions;
  reload: boolean = true;
  activeEditComponent: string;
  private activeEditComponentSubscription: Subscription;
  private componentSubscription: Subscription;

  constructor(
    private builderComponentService: BuilderComponentService,
    private simpleModalService: SimpleModalService,
    private modalService: NgbModal,
    private builderService: BuilderService,
    private sessionStorageService: SessionStorageService
  ) {
    this.options = {
      onUpdate: function (e: any) {
        let tempComponentsArrayWithPlaceholders = [];
        for (let i = 0; i < e.target.children.length; i++) {
          tempComponentsArrayWithPlaceholders.push(e.target.children[i].children[0].children[0].localName);
        }
        let tempComponentArrayWithoutPlaceholders = [];
        for (let i = 0; i < tempComponentsArrayWithPlaceholders.length; i++) {
          if (tempComponentsArrayWithPlaceholders[i] != 'app-builder-placeholder') {
            tempComponentArrayWithoutPlaceholders.push(`<${ tempComponentsArrayWithPlaceholders[i] }></${ tempComponentsArrayWithPlaceholders[i] }>`);
          }
        }
        let componentArray = tempComponentArrayWithoutPlaceholders.reduce((r, a) => r.concat(a, '<app-builder-placeholder></app-builder-placeholder>'), ['<app-builder-placeholder></app-builder-placeholder>']);
        builderComponentService.builderComponents.next(componentArray);
        sessionStorageService.setItem('components', JSON.stringify(componentArray));
        window.postMessage({ 'for': 'opsonion', 'action': 'recycle-dom' }, '*');
      }
    };
  }

  ngOnInit() {
    this.componentSubscription = this.builderComponentService.builderComponents.subscribe((response => {
      if (response) {
        this.builderComponents = response;
        this.sessionStorageService.setItem('components', JSON.stringify(response));
      }
    }));

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  builderComponentSelected(componentIndex) {
    this.builderComponentService.activeComponentIndex.next(componentIndex);
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if (e.data.action == 'component-added') {
        this.builderComponentService.builderComponents.next(e.data.data);
      }
      if (e.data.action == 'recycle-dom') {
        setTimeout(() => this.reload = false);
        setTimeout(() => this.reload = true);
      }
      if (e.data.action == 'component-exists') {
        this.simpleModalService.displayMessage('Oops!', 'This component cannot be added twice to a single page.');
      }
      if (e.data.action == 'delete-component') {
        this.modalService.open(BuilderDeleteComponentModalComponent, { windowClass: 'modal-holder', centered: true });
      }
      this.builderService.processIncomingMessages(e, this.activeEditComponent);
    }
  }
}
