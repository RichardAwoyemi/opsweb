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
  pageComponents: any;
  activePage: string = 'Home';
  private activeEditComponentSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private pageComponentsSubscription: Subscription;

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
        console.log(componentArray);
        window.postMessage({ 'for': 'opsonion', 'action': 'recycle-showcase-dom', 'data': componentArray }, '*');
      }
    };
  }

  ngOnInit() {
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((response => {
      if (response) {
        this.activePage = response;
        this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe((response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              if (this.pageComponents['pages'][i]['name'] == this.activePage) {
                this.builderComponents = this.pageComponents['pages'][i]['components'];
                this.sessionStorageService.setItem('components', JSON.stringify(response['pages'][i]['components']));
              }
            }
          }
        }));
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
        for (let i = 0; i < this.pageComponents['pages'].length; i++) {
          if (this.pageComponents['pages'][i]['name'] == this.activePage) {
            this.pageComponents['pages'][i]['components'] = e.data.data;
          }
        }
        this.builderComponentService.pageComponents.next(this.pageComponents);
      }
      if (e.data.action == 'recycle-showcase-dom') {
        for (let i = 0; i < this.pageComponents['pages'].length; i++) {
          if (this.pageComponents['pages'][i]['name'] == this.activePage) {
            this.pageComponents['pages'][i]['components'] = e.data.data;
            this.sessionStorageService.setItem('components', JSON.stringify(e.message));
          }
        }
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
