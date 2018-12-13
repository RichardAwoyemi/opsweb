import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './error.model.component.html'
})
export class ErrorModalComponent implements OnInit {

  public header: string;
  public message: string;

  constructor(
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
