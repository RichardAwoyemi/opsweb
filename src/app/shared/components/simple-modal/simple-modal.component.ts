import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './simple-modal.component.html'
})
export class SimpleModalComponent implements OnInit {

  public header: string;
  public message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
