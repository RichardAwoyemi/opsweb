import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-reviews',
  templateUrl: './home-reviews.component.html'
})
export class HomeReviewsComponent implements OnInit {
  reviews = [{
    review: 'Brilliant service! We were matched with a talented developer who put together our new company '
      + 'website within a couple of days.',
    author: 'Fred Obiosa, Co-Founder @ Ovents',
    image: '../assets/img/fred.jpg'
  }, {
    review: 'There\'s nothing out there like it. I completely lost trust in freelancing platforms ' +
      'until I found Opsonion.',
    author: 'Yinka Akomolafe, Co-Founder @ Marquess London',
    image: '../assets/img/jermaine.jpg'
  }, {
    review: 'Our matched developer was a great fit and accomplished our objectives without any ' +
      'hassle. Looking forward to posting my next project.',
    author: 'Abigail Yemofio, Co-Founder @ AV Afrique',
    image: '../assets/img/abigail.jpg'
  }];

  constructor(
  ) { }

  ngOnInit() {
  }
}
