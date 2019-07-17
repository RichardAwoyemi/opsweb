import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-application-modal',
  templateUrl: './create-application-modal.component.html'
})
export class CreateApplicationModalComponent  implements OnInit {
  innerHeight: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}
