import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';
import { UnsplashService } from '../../../../../shared/services/unsplash.service';
import { UtilService } from '../../../../../shared/services/util.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { BuilderActionsService } from '../../builder-actions.service';

@Component({
  selector: 'app-builder-select-image-photos',
  templateUrl: './builder-select-image-photos.component.html'
})
export class BuilderSelectImagePhotosComponent implements OnInit, OnDestroy {
  selectedImageIndex: number;
  selectedImage: any;
  searchText: string;
  images: any;
  innerHeight: number;
  activeLibrarySearchText: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private unsplashService: UnsplashService,
    private builderHeroService: BuilderHeroService,
    private builderActionsService: BuilderActionsService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 360;

    this.builderActionsService.activeLibrarySelectedImage.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      this.activeLibrarySearchText = response;
    });
  }

  searchImages() {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      UnsplashService.searchImages(this.searchText).then((images) => this.images = images);
    }
  }

  toggleSelection(i: number, image: any) {
    this.selectedImageIndex = i;
    this.selectedImage = image;
    this.builderActionsService.activeLibrarySelectedImage.next(image['urls']['full']);
    this.builderActionsService.activeLibrarySelectedImageAlt.next(image['alt_description']);
  }

  setImageSelection(i: number) {
    if (i === this.selectedImageIndex) {
      return { 'background-color': '#dee6fc' };
    } else {
      return {};
    }
  }

  onEnterKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.builderActionsService.activeLibrarySearchText.next(this.searchText);
      return this.searchImages();
    } else {
      if (this.searchText !== this.activeLibrarySearchText) {
        this.images = null;
      }
    }
    this.builderActionsService.activeLibrarySelectedImage.next(this.builderHeroService.heroImageUrl.getValue());
    this.builderActionsService.activeLibrarySelectedImageAlt.next(this.builderHeroService.heroImageAlt.getValue());
  }

  onSearchButtonClick() {
    this.builderActionsService.activeLibrarySearchText.next(this.searchText);
    return this.searchImages();
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
