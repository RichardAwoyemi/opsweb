import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-application-modal',
  templateUrl: './application-modal.component.html'
})
export class ApplicationModalComponent  implements OnInit {
  innerHeight: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
}
