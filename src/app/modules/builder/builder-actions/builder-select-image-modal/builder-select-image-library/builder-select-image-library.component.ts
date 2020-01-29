import { Component, HostListener, OnInit } from '@angular/core';
import { UtilService } from '../../../../../shared/services/util.service';
import { UnsplashService } from '../../../../../shared/services/unsplash.service';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-builder-select-image-library',
  templateUrl: './builder-select-image-library.component.html'
})
export class BuilderSelectImageLibraryComponent implements OnInit {
  selectedImageIndex: number;
  selectedImage: any;
  searchText: string;
  images: any;
  innerHeight: number;

  constructor(
    private unsplashService: UnsplashService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 360;
  }

  searchImages() {
    if (!UtilService.isNullOrWhitespace(this.searchText)) {
      this.unsplashService.searchImages(this.searchText).then((images) => this.images = images);
    }
  }

  toggleSelection(i: number, image: any) {
    this.selectedImageIndex = i;
    this.selectedImage = image;
  }

  setImageSelection(i: number) {
    if (i == this.selectedImageIndex) {
      return { 'background-color': '#dee6fc' };
    } else {
      return {};
    }
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      return this.searchImages();
    }
  }

  onSearchButtonClick() {
    return this.searchImages();
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }
}
