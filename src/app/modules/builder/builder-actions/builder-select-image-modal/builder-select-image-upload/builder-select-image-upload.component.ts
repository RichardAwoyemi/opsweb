import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { debounce } from '../../../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-builder-select-image-upload',
  templateUrl: './builder-select-image-upload.component.html'
})
export class BuilderSelectImageUploadComponent implements OnInit {
  heroImageUrl: string;
  heroImageAlt: string;
  imageHeight: number;
  innerHeight: number;
  private heroImageUrlSubscription: Subscription;
  private heroImageAltSubscription: Subscription;

  constructor(
    private builderHeroService: BuilderHeroService,
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

  onUploadImageButtonClick() {
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight - 284;
    this.imageHeight = window.innerHeight - 385;
  }
}
