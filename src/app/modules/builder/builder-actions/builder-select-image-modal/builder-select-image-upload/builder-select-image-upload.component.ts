import { Component, HostListener, OnDestroy, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';
import { BuilderActionsService } from '../../builder-actions.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-builder-select-image-upload',
  templateUrl: './builder-select-image-upload.component.html',
  styleUrls: ['./builder-select-image-upload.component.css']
})
export class BuilderSelectImageUploadComponent implements OnInit, OnDestroy  {
  @Input() componentId: any;
  @Input() parentKey: string;

  imageObject: any;
  imageHeight: number;
  innerHeight: number;
  croppedImage: any;
  imageChangedEvent = null;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private builderActionsService: BuilderActionsService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 284;
    this.imageHeight = window.innerHeight - 385;

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        const pageComponent = response;
        const targetComponentLocation = this.builderComponentsService.getActiveTargetComponentById(this.componentId);
        const targetComponent = UtilService.shallowClone(pageComponent['pages'][targetComponentLocation.activePageIndex]['components'][targetComponentLocation.activeComponentIndex]);
        if (targetComponent.hasOwnProperty(this.parentKey)) {
          this.imageObject = targetComponent[this.parentKey];
        } else {
          this.imageObject = targetComponent['style'][this.parentKey];
        }
      });

  }

  fileChangeEvent(event) {
    if (event.target.files && event.target.files.length) {
      this.imageChangedEvent = event;
      this.imageObject['src'] = event.base64;
      this.builderActionsService.activeLibrarySelectedImage.next(event.base64);
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight - 284;
    this.imageHeight = window.innerHeight - 385;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.builderActionsService.activeLibrarySelectedImage.next(event.base64);
  }

  onCropImageButtonClick() {
    this.imageChangedEvent = null;
    this.imageObject['src'] = this.croppedImage;
    this.builderActionsService.activeLibrarySelectedImage.next(this.croppedImage);
  }


  setHeroImageAlt() {
    this.builderActionsService.activeLibrarySelectedImageAlt.next(this.imageObject['alt']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
