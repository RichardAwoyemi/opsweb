import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './home.page.html'
})
export class HomeComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit() {
    library.add(faFacebookF, faGoogle, faLongArrowAltRight);
  }
}
