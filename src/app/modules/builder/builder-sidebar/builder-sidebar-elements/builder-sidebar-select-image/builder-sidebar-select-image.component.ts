import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { BuilderSelectImageModalComponent } from '../../../builder-actions/builder-select-image-modal/builder-select-image-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar-select-image',
  styleUrls: ['./builder-sidebar-select-image.component.css'], 
  templateUrl: './builder-sidebar-select-image.component.html'
})

export class BuilderSidebarSelectImageComponent implements OnInit, OnDestroy {

  styleObject: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();

  @Input() data: any;
  @Input() elementSettings: any;

  constructor(
    private modalService: NgbModal,
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response && this.data.componentIndex) {
        const pageComponent = response;
        const component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        if (this.elementSettings.name in component) {
          this.styleObject = component[this.elementSettings.name];
        } else {
          this.styleObject = component['style'][this.elementSettings.name];
        }
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  openSelectImageModal() {
    const modalRef = this.modalService.open(BuilderSelectImageModalComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.componentId = this.activeEditComponentId;
    modalRef.componentInstance.parentKey = this.elementSettings.name;
  }

  resetImage() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    this.styleObject = defaultTemplate['style'][this.elementSettings.name];
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.elementSettings.name, 'src', this.styleObject['src']);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.elementSettings.name, 'alt', this.styleObject['alt']);
  }


  setOptionValue(optionValue) {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, optionValue);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
