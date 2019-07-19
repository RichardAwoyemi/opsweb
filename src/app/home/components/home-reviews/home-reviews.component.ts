import { Component } from '@angular/core';

@Component({
  selector: 'app-home-reviews',
  templateUrl: './home-reviews.component.html'
})
export class HomeReviewsComponent {
  index = 0;
  reviews = [{
    review: 'Brilliant service! Their talented developer who put together our new company '
      + 'website within a couple of days.',
    author: 'Fred Obiosa, Co-Founder @ Ovents',
    image: '../assets/img/fred.jpg'
  }, {
    review: 'There\'s nothing out there like it. They engaged with our ideas and created ' +
      'something beautiful, really happy I found Opsonion.',
    author: 'Yinka Akomolafe, Co-Founder @ Marquess London',
    image: '../assets/img/jermaine.jpg'
  }, {
    review: 'Our developer was a great fit and accomplished our objectives without any ' +
      'hassle. Looking forward to posting my next project.',
    author: 'Abigail Yemofio, Co-Founder @ AV Afrique',
    image: '../assets/img/abigail.jpg'
  }];
}
