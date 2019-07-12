import { TestBed, async } from '@angular/core/testing';
import { HomeReviewsComponent } from './home-reviews.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { By } from '@angular/platform-browser';

describe('HomeReviewsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeReviewsComponent],
      imports: [SwiperModule]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeReviewsComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have reviews', async(() => {
      app.reviews = [{
        review: 'Review 1',
        author: 'Author 1',
        image: '../assets/img/fred.jpg'
      }, {
        review: 'Review 2',
        author: 'Author 2',
        image: '../assets/img/fred.jpg'
      }, {
        review: 'Review 3',
        author: 'Author 3',
        image: '../assets/img/fred.jpg'
      }];
      fixture.detectChanges();
      const reviews = fixture.debugElement.queryAll(By.css('.review'));
      const reviewImages = fixture.debugElement.queryAll(By.css('.review-image'));
      const reviewAuthors = fixture.debugElement.queryAll(By.css('.review-author'));
      expect(reviews.length).toEqual(3);
      expect(reviewImages.length).toEqual(3);
      expect(reviewAuthors.length).toEqual(3);
      expect(reviews[0].nativeElement.innerHTML).toContain(app.reviews[0].review);
      expect(reviews[1].nativeElement.innerHTML).toContain(app.reviews[1].review);
      expect(reviews[2].nativeElement.innerHTML).toContain(app.reviews[2].review);
      expect(reviewAuthors[0].nativeElement.innerHTML).toContain(app.reviews[0].author);
      expect(reviewAuthors[1].nativeElement.innerHTML).toContain(app.reviews[1].author);
      expect(reviewAuthors[2].nativeElement.innerHTML).toContain(app.reviews[2].author);
    }));
  });
});
