import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../_services/data.service';
import { ModalService } from '../_services/modal.service';

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
    private dataService: DataService,
    private modalService: ModalService,
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
  featureSelected: string;

  programmingTasks: any;
  programmingTasksSubscription: Subscription;

  webCategories: any;
  webCategoriesSubscription: Subscription;

  webCustom: any;
  webCustomSubscription: Subscription;
  webCustomAlert: any;
  webCustomAlertSubscription: Subscription;
  webCustomAuth: any;
  webCustomAuthSubcription: Subscription;
  webCustomEcommerce: any;
  webCustomEcommerceSubscription: Subscription;
  webCustomFinance: any;
  webCustomFinanceSubscription: Subscription;
  webCustomGames: any;
  webCustomGamesSubscription: Subscription;
  webCustomMultimedia: any;
  webCustomMultimediaSubscription: Subscription;
  webCustomSocial: any;
  webCustomSocialSubscription: Subscription;

  isMobile: Observable<BreakpointState>;
  task: any;
  innerHeight: number;
  innerColumnHeight: number;
  innerColumnSidebarHeight: number;

  customFeatureName: string;
  customFeatureDescription: string;
  customFeatureSimilarApps: string;

  basket = [];

  @ViewChild('resetModal') resetModal: ElementRef;
  @ViewChild('requestFeatureModal') requestFeatureModal: ElementRef;
  @ViewChild('basketModal') basketModal: ElementRef;

  ngOnInit() {
    this.ngxLoader.start();

    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.task = window.localStorage.getItem('tasks');
    this.innerHeight = window.innerHeight;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
    this.logger.debug('Current task is:');
    this.logger.debug(this.task);
    this.logger.debug(`Window height is: ${this.innerHeight}`);

    this.programmingTasksSubscription = this.dataService.getAllProgrammingTasks().subscribe(response => {
      if (response) {
        this.logger.debug('Programming tasks:');
        this.logger.debug(response);
        this.programmingTasks = response;
      }
    });

    this.webCategoriesSubscription = this.dataService.getAllWebCategories().subscribe(response => {
      if (response) {
        this.logger.debug('Web categories:');
        this.logger.debug(response);
        this.webCategories = response;
      }
    });

    this.webCustomSubscription = this.dataService.getAllWebCustom().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom:');
        this.logger.debug(response);
        this.webCustom = response;
      }
    });

    this.webCustomAlertSubscription = this.dataService.getAllWebCustomAlert().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom alert:');
        this.logger.debug(response);
        this.webCustomAlert = response;
      }
    });

    this.ngxLoader.stop();

    // delete after testing
    // const config: ScrollToConfigOptions = {
    //   target: 'step2'
    // };
    // this.scrollToService.scrollTo(config);
    // document.body.style.overflow = 'hidden';
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.innerHeight = window.innerWidth;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
  }

  selectProduct(productId) {
    this.logger.debug(`Product selected: ${productId}`);
    this.productSelected = productId;
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
  }

  selectCategory(categoryId) {
    this.logger.debug(`Category selected: ${categoryId}`);
    this.categorySelected = categoryId;
    this.featureSelected = null;
  }

  selectFeature(feature) {
    this.logger.debug(`Feature selected: ${JSON.stringify(feature)}`);
    this.featureSelected = feature;
  }

  addToBasket(feature) {
    this.logger.debug(`Basket before feature added: ${JSON.stringify(this.basket)}`);
    feature.in_basket = true;
    this.basket.push(feature);
    this.logger.debug(`Basket after feature added: ${JSON.stringify(this.basket)}`);
    this.modalService.displayMessage('Great!', `"${feature.name}" has been added to your basket.`);
  }

  removeFromBasket(feature) {
    this.logger.debug(`Basket before feature removed: ${JSON.stringify(this.basket)}`);
    this.logger.debug('Looping through basket items until item found');
    for (let i = 0; i < this.basket.length; i++) {
      this.logger.debug(this.basket[i]);
      if (this.basket[i]['id'] = feature.id) {
        this.logger.debug(`Found item to delete: ${JSON.stringify(this.basket[i])}`);
        this.basket.splice(i, 1);
      }
    }
    feature.in_basket = false;
    this.modalService.displayMessage('Great!', `"${feature.name}" has been removed from your basket.`);
    this.logger.debug(`Basket after feature removed: ${JSON.stringify(this.basket)}`);
  }

  resume() {
    this.ngxLoader.start();
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  getFeatures(id) {
    if (id === 'web-custom-alert') {
      return this.webCustomAlert;
    }
  }

  reset() {
    $(this.resetModal.nativeElement).modal('hide');
    this.productSelected = null;
    this.categorySelected = null;
    this.featureSelected = null;
    document.body.style.overflow = '';
    window.scroll(0, 0);
  }

  showResetModal() {
    $(this.resetModal.nativeElement).modal('show');
  }

  showRequestFeatureModal() {
    $(this.requestFeatureModal.nativeElement).modal('show');
  }

  showBasketModal() {
    $(this.basketModal.nativeElement).modal('show');
  }

  public onIndexChange(index: number): void {
    this.index = index;
    this.logger.debug('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    this.logger.debug('Swiper event: ', event);
  }
}
