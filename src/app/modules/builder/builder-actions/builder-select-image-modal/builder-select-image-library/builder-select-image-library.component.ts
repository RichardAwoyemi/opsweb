import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';
import { ImageLibraryService } from '../../../../../shared/services/image-library.service';
import { UtilService } from '../../../../../shared/services/util.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { BuilderActionsService } from '../../builder-actions.service';

@Component({
  selector: 'app-builder-select-image-library',
  templateUrl: './builder-select-image-library.component.html'
})
export class BuilderSelectImageLibraryComponent implements OnInit, OnDestroy {

  private imageLibraryObject: any;
  filteredLibraryObject: any;
  selectedImage: any;
  images: any;
  innerHeight: number;
  selectedImageIndex: number;
  searchText: string;
  activeLibrarySearchText: string;

  private imageLibrarySubscription: Subscription;
  private activeLibrarySearchTextSubscription: Subscription;

  constructor(
    private builderHeroService: BuilderHeroService,
    private builderActionsService: BuilderActionsService,
    private imageLibraryService: ImageLibraryService,
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 360;

    this.imageLibrarySubscription = this.imageLibraryService.getImageDetails().subscribe(response => {
      if (response) {
        this.imageLibraryObject = Object.keys(response).map(i => response[i]);
        var keys = Object.keys(this.imageLibraryObject);
        keys.sort(function (a, b) { return Math.random() - 0.5; });
      }
    });

    this.activeLibrarySearchTextSubscription = this.builderActionsService.activeLibrarySelectedImage.subscribe(response => {
      this.activeLibrarySearchText = response;
    });
  }

  searchImages() {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.filteredLibraryObject = this.imageLibraryObject.filter(obj => {
        return obj.altDescription.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  }

  toggleSelection(i: number, image: any) {
    this.selectedImageIndex = i;
    this.selectedImage = image;
    this.builderActionsService.activeLibrarySelectedImage.next(image['path']);
    this.builderActionsService.activeLibrarySelectedImageAlt.next(image['altDescription']);
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

  ngOnDestroy() {
    UtilService.safeUnsubscribe(this.imageLibrarySubscription);
    UtilService.safeUnsubscribe(this.activeLibrarySearchTextSubscription);
  }
}
