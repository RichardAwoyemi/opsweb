import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  templateUrl: './support.component.html',
  styleUrls: [ './support.component.css' ]
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    library.add(faAngleRight);
  }
}
