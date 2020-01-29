import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderSelectImageModalComponent } from '../../../builder-actions/builder-select-image-modal/builder-select-image-modal.component';

@Component({
  selector: 'app-hero-options-picker',
  templateUrl: './hero-options-picker.component.html',
  styleUrls: ['./hero-options-picker.component.css']
})
export class HeroOptionsPickerComponent implements OnInit {
  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
  }

  resetHeroImage() {
  }

  openSelectImageModal() {
    this.modalService.open(BuilderSelectImageModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }
}
