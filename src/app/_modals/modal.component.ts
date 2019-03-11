import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  public header: string;
  public message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
