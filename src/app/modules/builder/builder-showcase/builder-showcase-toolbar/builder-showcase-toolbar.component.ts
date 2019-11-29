import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { ActiveComponents, ActiveElements } from '../../builder';

@Component({
  selector: 'app-builder-showcase-toolbar',
  templateUrl: './builder-showcase-toolbar.component.html',
  styleUrls: ['./builder-showcase-toolbar.component.css']
})
export class BuilderShowcaseToolbarComponent implements OnInit {
  innerHeight: number;
  activePage: string;
  previewButtonIcon: string = 'btn-icon';
  navbarMenuOptions = Array<String>();
  previewMode: boolean;
  activePageIndex: number;
  private navbarMenuOptionsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private activePageIndexSubscription: Subscription;

  activeToolbarOrientation: string;
  private activeOrientationSubscription: Subscription;
  private previewModeSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      this.previewMode = response;
      if (this.previewMode) {
        this.previewButtonIcon = 'btn-icon-active';
      } else {
        this.previewButtonIcon = 'btn-icon';
      }
    }));

    this.activeOrientationSubscription = this.builderService.activeOrientation.subscribe((response => {
      if (response) {
        this.activeToolbarOrientation = response;
      }
    }));

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe((response => {
      if (response) {
        this.activePage = response;
      }
    }));

    this.activePageIndexSubscription = this.builderService.activePageIndex.subscribe((response => {
      if (response) {
        this.activePageIndex = response;
      }
    }));

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe((response => {
      if (response) {
        this.navbarMenuOptions = response.filter(e => e !== this.activePage);
      }
    }));
  }

  openDeletePageModal() {
    if (this.activePage !== 'Home') {
      const modal = this.modalService.open(BuilderDeletePageModalComponent, { windowClass: 'modal-holder', centered: true });
      modal.componentInstance.activePage = this.activePage;
      modal.componentInstance.activePageIndex = this.activePageIndex;
    } else {
      this.simpleModalService.displayMessage('Oops!', `You cannot delete the ${ this.activePage } page.`);
    }
  }

  openNewPageModal() {
    this.modalService.open(BuilderNewPageModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  togglePreview() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.setSidebarComponentsSetting();
    this.builderService.previewMode.next(!this.previewMode);
  }
}

