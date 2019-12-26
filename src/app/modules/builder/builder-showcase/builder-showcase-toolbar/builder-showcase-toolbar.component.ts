import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderDeletePageModalComponent } from '../../builder-actions/builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from '../../builder-actions/builder-new-page-modal/builder-new-page-modal.component';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';
import { ActiveComponents, ActiveElements } from '../../builder';
import { BuilderComponentService } from '../../builder-components/builder.component.service';

@Component({
  selector: 'app-builder-showcase-toolbar',
  templateUrl: './builder-showcase-toolbar.component.html',
  styleUrls: ['./builder-showcase-toolbar.component.css']
})
export class BuilderShowcaseToolbarComponent implements OnInit {
  innerHeight: number;
  activePage: string = 'Home';
  previewButtonIcon: string = 'btn-icon';
  fullScreenButtonIcon: string = 'btn-icon';
  navbarMenuOptions = Array<String>();
  previewMode: boolean;
  fullScreenMode: boolean;
  activePageIndex: number;
  private navbarMenuOptionsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private fullScreenModeSubscription: Subscription;
  private activePageIndexSubscription: Subscription;

  activeToolbarOrientation: string;
  private activeOrientationSubscription: Subscription;
  private previewModeSubscription: Subscription;
  dropdownClass: string = 'dropdown';
  dropdownMenuClass: string = 'dropdown-menu';
  ariaExpandedAttribute: string = 'false';

  constructor(
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentService,
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

    this.fullScreenModeSubscription = this.builderService.fullScreenMode.subscribe((response => {
      this.fullScreenMode = response;
      if (this.fullScreenMode) {
        this.fullScreenButtonIcon = 'btn-icon-active';
      } else {
        this.fullScreenButtonIcon = 'btn-icon';
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
        this.navbarMenuOptions = response;
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

  setDropdownClass() {
    this.dropdownClass = 'dropdown show';
    this.dropdownMenuClass = 'dropdown-menu show';
    this.ariaExpandedAttribute = 'true';
  }

  setActivePage(navbarMenuOption: string) {
    this.dropdownClass = 'dropdown';
    this.dropdownMenuClass = 'dropdown-menu';
    this.ariaExpandedAttribute = 'false';
    this.builderService.activePageSetting.next(navbarMenuOption);
  }

  toggleFullScreen() {
    this.builderService.fullScreenMode.next(!this.fullScreenMode);
    if (this.fullScreenMode) {
      this.openFullScreen();
    } else {
      this.closeFullScreen();
    }
  }

  openFullScreen() {
    let element = document.documentElement;
    let methodToBeInvoked = element['requestFullscreen'] || element['webkitRequestFullScreen'] || element['mozRequestFullscreen'] || element['msRequestFullscreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(element);
    }
  }

  closeFullScreen() {
    let methodToBeInvoked = document['exitFullscreen'] || document['webkitExitFullscreen'] || document['mozCancelFullScreen'];
    if (methodToBeInvoked) {
      methodToBeInvoked.call(document);
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  onFullScreenChange() {
    let fullscreenElement = document.fullscreenElement || document['mozFullScreenElement'] || document['webkitFullscreenElement'];
    if (!fullscreenElement) {
      this.builderService.fullScreenMode.next(false);
    }
  }
}
