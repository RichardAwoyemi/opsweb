import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../_services/data.service';
import { ModalService } from '../_services/modal.service';
import { Options } from 'ng5-slider/options';
import { ChangeContext } from 'ng5-slider';

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
    slidesPerView: 'auto',
    keyboard: true,
    mousewheel: true,
    navigation: true,
    autoplay: false
  };

  index = 0;
  lastIndex = false;
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

  similarApps: any;
  similarAppsSubscription: Subscription;

  isMobile: Observable<BreakpointState>;
  task: any;
  innerHeight: number;
  innerColumnHeight: number;
  innerColumnSidebarHeight: number;

  customFeatureName: string;
  customFeatureDescription: string;
  customFeatureSimilarApps: string;

  taskName: string;
  taskDescription: string;
  taskSimilarApps: any;

  speedMultiplier = 1;
  phaseMultiplier = 1;

  basket = [];
  basketGbpTotal = 0;
  basketGbpTotalAdjustments = 0;
  completionDate: string;
  carePlanSelected: boolean;

  step2Active: boolean;
  step3Active: boolean;
  step4Active: boolean;
  step5Active: boolean;

  value = this.speedMultiplier;
  speed = ['Relaxed', 'Standard', 'Prime'];
  options: Options = {
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ],
    hideLimitLabels: true,
    translate: (value: number): string => {
      return this.speed[value];
    }
  };

  @ViewChild('resetModal') resetModal: ElementRef;
  @ViewChild('requestFeatureModal') requestFeatureModal: ElementRef;
  @ViewChild('basketModal') basketModal: ElementRef;
  @ViewChild('carePlanModal') carePlanModal: ElementRef;

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

    this.similarAppsSubscription = this.dataService.getAllSimilarApps().subscribe(response => {
      if (response) {
        this.logger.debug('Similar apps:');
        this.logger.debug(response);
        this.similarApps = response;
      }
    });

    this.ngxLoader.stop();

    // comment after testing
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step4'
    };
    this.productSelected = 'test';
    this.taskName = 'test';
    this.taskDescription = 'test';
    this.basket = [{
      'id': 'web-desktop-notifications', 'name': 'Desktop Notifications',
      'description': 'Send desktop notifications and manage them.', 'price_gbp': 225, 'time_weeks': 0.25,
      'in_basket': true
    }, {
      'id': 'web-email-notifications', 'name': 'Email Notifications', 'description':
        'Send email notifications and manage them.', 'price_gbp': 225, 'in_basket': true
    }, {
      'id':
        'web-notification-page', 'name': 'Notification Page', 'description':
        'Display recent notifications on a single page.', 'price_gbp': 300, 'in_basket': true
    },
    {
      'id':
        'web-notification-page', 'name': 'Notification Page', 'description':
        'Display recent notifications on a single page.', 'price_gbp': 300, 'in_basket': true
    },
    {
      'id':
        'web-notification-page', 'name': 'Notification Page', 'description':
        'Display recent notifications on a single page.', 'price_gbp': 300, 'in_basket': true
    },
    {
      'id':
        'web-notification-page', 'name': 'Notification Page', 'description':
        'Display recent notifications on a single page.', 'price_gbp': 300, 'in_basket': true
    }];
    this.step2Active = true;
    this.step3Active = true;
    this.step4Active = true;
    this.step5Active = true;
    this.speedMultiplier = 2;
    this.value = 2;
    this.basketGbpTotal = this.calculateBasketTotal('gbp');
    this.scrollToService.scrollTo(config);
    this.carePlanSelected = true;
    document.body.style.overflow = 'hidden';
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.innerHeight = window.innerWidth;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
    this.lastIndex = this.isScrolledIntoView('box-7');
  }

  selectProduct(productId) {
    this.logger.debug(`Product selected: ${productId}`);
    this.step2Active = true;
    this.step3Active = true;
    this.step4Active = true;
    this.step5Active = true;
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

  setCarePlan(value) {
    this.logger.debug(`Care plan set to: ${value}`);
    this.carePlanSelected = value;
  }

  setCarePlanBtnColour(value) {
    if (value === 'yes' && this.carePlanSelected === true) {
      return 'btn-success';
    }
    if (value === 'no' && this.carePlanSelected === false) {
      return 'btn-success';
    }
    return 'btn-secondary';
  }

  setFeatureBgColor(feature) {
    if (this.featureSelected) {
      if ((feature['in_basket'] || !feature['in_basket']) && (feature['id'] === this.featureSelected['id'])) {
        return '#E8F0FE';
      }
    }
    if (feature['in_basket']) {
      return '#E5FFE5';
    }
    if (!feature['in_basket']) {
      return '#FFFFFF';
    }
  }

  addToBasket(feature) {
    this.logger.debug(`Basket before feature added: ${JSON.stringify(this.basket)}`);
    feature.in_basket = true;
    this.basket.push(feature);
    this.basketGbpTotal = this.calculateBasketTotal('gbp');
    this.logger.debug(`Basket after feature added: ${JSON.stringify(this.basket)}`);
  }

  removeFromBasket(feature) {
    this.selectFeature(feature);
    this.logger.debug(`Basket before feature removed: ${JSON.stringify(this.basket)}`);
    this.logger.debug('Looping through basket items until item found');
    for (let i = 0; i < this.basket.length; i++) {
      this.logger.debug(this.basket[i]);
      if (this.basket[i]['id'] === feature.id) {
        this.logger.debug(`Found item to delete: ${JSON.stringify(this.basket[i])}`);
        this.basket.splice(i, 1);
      }
    }
    feature.in_basket = false;
    this.basketGbpTotal = this.calculateBasketTotal('gbp');
    this.logger.debug(`Basket after feature removed: ${JSON.stringify(this.basket)}`);
  }

  calculateBasketTotal(currency) {
    let total = 0;
    for (let i = 0; i < this.basket.length; i++) {
      if (currency = 'gbp') {
        total = total + this.basket[i]['price_gbp'];
      }
    }
    const basketTotal = total * this.speedMultiplier;
    this.basketGbpTotalAdjustments = total - (total * this.speedMultiplier);
    this.logger.debug(`Basket total: ${basketTotal}`);
    this.logger.debug(`Basket total adjustments: ${this.basketGbpTotalAdjustments}`);
    return basketTotal;
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
    this.taskName = null;
    this.taskDescription = null;
    this.taskSimilarApps = [];
    this.basket = [];
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

  showCarePlanModal() {
    $(this.carePlanModal.nativeElement).modal('show');
  }

  setTaskNameAndDescription() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step3'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
    document.getElementById('intercom-css-container').style.display = 'none';
    document.getElementById('intercom-container').style.display = 'none';
    this.ngxLoader.stop();
  }

  selectFeatures() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step4'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
    document.getElementById('intercom-css-container').style.display = '';
    document.getElementById('intercom-container').style.display = '';
    this.ngxLoader.stop();
  }

  setDeliveryAndCare() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step5'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  prevStep1() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    document.body.style['overflow-x'] = 'hidden';
    this.step2Active = false;
    this.step3Active = false;
    this.step4Active = false;
    window.scroll(0, 0);
    this.ngxLoader.stop();
  }

  prevStep2() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    document.getElementById('intercom-css-container').style.display = '';
    document.getElementById('intercom-container').style.display = '';
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  prevStep3() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step3'
    };
    this.scrollToService.scrollTo(config);
    document.getElementById('intercom-css-container').style.display = 'none';
    document.getElementById('intercom-container').style.display = 'none';
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  prevStep4() {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step4'
    };
    this.scrollToService.scrollTo(config);
    document.getElementById('intercom-css-container').style.display = '';
    document.getElementById('intercom-container').style.display = '';
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  setDeliverySpeed(changeContext: ChangeContext): void {
    this.logger.debug(`Delivery speed set to: ${JSON.stringify(changeContext)}`);
    if (changeContext.value === 0) {
      this.speedMultiplier = 0.75;
      this.basketGbpTotal = this.calculateBasketTotal('gbp');
    }
    if (changeContext.value === 1) {
      this.speedMultiplier = 1;
      this.basketGbpTotal = this.calculateBasketTotal('gbp');
    }
    if (changeContext.value === 2) {
      this.speedMultiplier = 1.5;
      this.basketGbpTotal = this.calculateBasketTotal('gbp');
    }
  }

  public onIndexChange(index: number): void {
    this.index = index;
    this.logger.debug('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    this.logger.debug('Swiper event: ', event);
    this.lastIndex = this.isScrolledIntoView('box-7');
    this.logger.debug(`Last index visible: ${this.lastIndex}`);
  }

  isScrolledIntoView(e) {
    const lastSlide = document.getElementById(e);
    if (e) {
      const bounding = lastSlide.getBoundingClientRect();
      this.logger.debug(`Last slide position: ${JSON.stringify(bounding)}`);
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth - 100 || document.documentElement.clientWidth - 100) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        this.logger.debug('Last slide is in the viewport');
        return true;
      } else {
        this.logger.debug('Last slide is not in the viewport');
        return false;
      }
    }
  }
}
