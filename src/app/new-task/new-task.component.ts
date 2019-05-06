import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var $;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private scrollToService: ScrollToService,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger
  ) { }

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: true,
    navigation: true,
    autoplay: false
  };

  index = 0;
  productSelected: string;
  categorySelected: string;

  programmingSlides = [
    {
      id: 'web',
      name: 'Web',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'mobile',
      name: 'Mobile',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'desktop',
      name: 'Desktop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'testing',
      name: 'Testing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'data-science',
      name: 'Data Science',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'devops',
      name: 'DevOps',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    }
  ];

  webCategories = [
    {
      id: 'custom',
      name: 'Custom',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'chatbot',
      name: 'Chatbots',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'squarespace',
      name: 'Squarespace',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'wordpress',
      name: 'Wordpress',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      id: 'wix',
      name: 'Wix',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    }
  ];

  isMobile: Observable<BreakpointState>;
  task: any;
  innerHeight: number;
  innerColumnHeight: number;
  innerColumnSidebarHeight: number;

  @ViewChild('resetModal') resetModal: ElementRef;

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.task = window.localStorage.getItem('tasks');
    this.innerHeight = window.innerHeight;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
    this.logger.debug('Current task is:');
    this.logger.debug(this.task);
    this.logger.debug(`Window height is: ${this.innerHeight}`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.innerHeight = window.innerWidth;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
  }

  selectProduct(productId) {
    this.logger.debug(`Product selected: ${productId}`);
    this.ngxLoader.start();
    this.productSelected = productId;
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    this.ngxLoader.stop();
  }

  selectCategory(categoryId) {
    this.logger.debug(`Category selected: ${categoryId}`);
    this.ngxLoader.start();
    this.categorySelected = categoryId;
    this.ngxLoader.stop();
  }

  resume() {
    this.ngxLoader.start();
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    this.ngxLoader.stop();
  }

  reset() {
    $(this.resetModal.nativeElement).modal('hide');
    this.productSelected = null;
    this.categorySelected = null;
  }

  showResetModal() {
    $(this.resetModal.nativeElement).modal('show', { size: 'sm' });
  }

  public onIndexChange(index: number): void {
    this.index = index;
    this.logger.debug('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    this.logger.debug('Swiper event: ', event);
  }
}
