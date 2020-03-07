import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BuilderActionsService } from '../../builder-actions.service';

@Component({
  selector: 'app-builder-select-image-upload',
  templateUrl: './builder-select-image-upload.component.html',
  styleUrls: ['./builder-select-image-upload.component.css']
})
export class BuilderSelectImageUploadComponent implements OnInit, OnDestroy {
  heroImageUrl: string;
  heroImageAlt: string;
  imageHeight: number;
  innerHeight: number;
  croppedImage: any;
  imageChangedEvent: any;

  private heroImageUrlSubscription: Subscription;
  private heroImageAltSubscription: Subscription;

  constructor(
    private builderHeroService: BuilderHeroService,
    private builderActionsService: BuilderActionsService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 284;
    this.imageHeight = window.innerHeight - 385;

    this.heroImageUrlSubscription = this.builderHeroService.heroImageUrl.subscribe(response => {
      if (response) {
        this.heroImageUrl = response;
      }
    });

    this.heroImageAltSubscription = this.builderHeroService.heroImageAlt.subscribe(response => {
      if (response) {
        this.heroImageAlt = response;
      }
    });
  }

  fileChangeEvent(event) {
    if (event.target.files && event.target.files.length) {
      this.imageChangedEvent = event;
      this.heroImageUrl = event.base64;
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
    this.heroImageUrl = this.croppedImage;
    this.builderActionsService.activeLibrarySelectedImage.next(this.croppedImage);
  }

  ngOnDestroy() {
    this.heroImageUrlSubscription.unsubscribe();
    this.heroImageAltSubscription.unsubscribe();
  }
}
