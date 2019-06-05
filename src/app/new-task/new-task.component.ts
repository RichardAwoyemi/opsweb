import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../_services/data.service';
import { Options } from 'ng5-slider/options';
import { ChangeContext } from 'ng5-slider';
import { Router } from '@angular/router';
import { TaskService } from '../_services/task.service';

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
    private taskService: TaskService,
    private logger: NGXLogger,
    public router: Router
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

  user: any;

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

  currency = 'gbp';
  basket = [];
  basketTotal = 0;
  basketTotalAdjustments = 0;
  completionDate: string;
  differenceInDays: number;
  carePlanPrice = 0;
  deliverySpeed = 1;
  carePlanSelected: string;
  costMultiplier = 1;
  speedMultiplier = 1;
  sliderValue = this.costMultiplier;
  sliderOptions: Options = {
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ],
    hideLimitLabels: true,
    translate: (value: number): string => {
      return this.taskService.speedOptions[value];
    }
  };

  step2Active: boolean;
  step3Active: boolean;
  step4Active: boolean;
  step5Active: boolean;

  @ViewChild('resetModal') resetModal: ElementRef;
  @ViewChild('requestFeatureModal') requestFeatureModal: ElementRef;
  @ViewChild('basketModal') basketModal: ElementRef;
  @ViewChild('basketDetailModal') basketDetailModal: ElementRef;
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

    this.user = JSON.parse(localStorage.getItem('user'));
    this.logger.debug(`Email address is: ${this.user.email}`);

    this.ngxLoader.stop();
  }

  setProduct(productId) {
    this.logger.debug(`Product selected: ${productId}`);
    this.productSelected = productId;
  }

  setCategory(categoryId) {
    this.logger.debug(`Category selected: ${categoryId}`);
    this.categorySelected = categoryId;
    this.featureSelected = null;
  }

  setFeature(feature) {
    this.logger.debug(`Feature selected: ${JSON.stringify(feature)}`);
    this.featureSelected = feature;
  }

  setCarePlan(value) {
    this.logger.debug(`Care plan set to: ${value}`);
    this.carePlanSelected = value;
    this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.basketTotal);
    this.logger.debug(`Care plan price set to: ${this.carePlanPrice}`);
  }

  setCarePlanBtnColour(value) {
    if (value === 'yes' && this.carePlanSelected === 'yes') {
      return 'btn-success';
    }
    if (value === 'no' && this.carePlanSelected === 'no') {
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

  calculateBasketTotal(currency): number {
    let total = 0;
    for (let i = 0; i < this.basket.length; i++) {
      if (currency = 'gbp') {
        total = total + this.basket[i]['price_gbp'];
      }
    }
    const basketTotal = total * this.costMultiplier;
    this.basketTotalAdjustments = total - (total * this.costMultiplier);
    this.logger.debug(`Basket total: ${basketTotal}`);
    this.logger.debug(`Basket total adjustments: ${this.basketTotalAdjustments}`);
    return basketTotal;
  }

  calculateCompletionDate() {
    let totalWeeks = 0;
    for (let i = 0; i < this.basket.length; i++) {
      totalWeeks = totalWeeks + this.basket[i]['time_weeks'];
    }
    this.logger.debug(`Weeks total: ${totalWeeks}`);
    const totalDays = Math.round(totalWeeks * 7 * this.speedMultiplier);
    const completionDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    completionDate.setDate(completionDate.getDate() + totalDays);
    return `${completionDate.getDate()} ${monthNames[completionDate.getMonth() + 1]} ${completionDate.getFullYear()}`;
  }

  calculateDateDifference() {
    let totalWeeks = 0;
    for (let i = 0; i < this.basket.length; i++) {
      totalWeeks = totalWeeks + this.basket[i]['time_weeks'];
    }
    this.logger.debug(`Weeks total: ${totalWeeks}`);
    const expectedCompletionDate = new Date();
    const adjustedCompletionDate = new Date();
    const expectedTotalDays = Math.round(totalWeeks * 7);
    const adjustedtotalDays = Math.round(totalWeeks * 7 * this.speedMultiplier);
    expectedCompletionDate.setDate(expectedCompletionDate.getDate() + expectedTotalDays);
    adjustedCompletionDate.setDate(adjustedCompletionDate.getDate() + adjustedtotalDays);
    const diffTime = Math.abs(adjustedCompletionDate.getTime() - expectedCompletionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.logger.debug(`Difference in days: ${diffDays}`);
    return diffDays;
  }

  getFeatures(id) {
    if (id === 'web-custom-alert') {
      return this.webCustomAlert;
    }
  }

  resetTaskProperties(): void {
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

  showResetModal(): void {
    $(this.resetModal.nativeElement).modal('show');
  }

  showRequestFeatureModal(): void {
    $(this.requestFeatureModal.nativeElement).modal('show');
  }

  showBasketModal(): void {
    $(this.basketModal.nativeElement).modal('show');
  }

  showCarePlanModal(): void {
    $(this.carePlanModal.nativeElement).modal('show');
  }

  showBasketDetailModal(): void {
    $(this.basketDetailModal.nativeElement).modal('show');
  }

  onSetProduct(productId): void {
    this.step2Active = true;
    this.step3Active = true;
    this.step4Active = true;
    this.step5Active = true;
    this.setProduct(productId);
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
  }

  onStep2NextButtonClick(): void {
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

  onStep3NextButtonClick(): void {
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

  onStep4NextButtonClick(): void {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    const config: ScrollToConfigOptions = {
      target: 'step5'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  onStep2PreviousButtonClick(): void {
    this.ngxLoader.start();
    document.body.style.overflow = '';
    document.body.style['overflow-x'] = 'hidden';
    this.step2Active = false;
    this.step3Active = false;
    this.step4Active = false;
    this.step5Active = false;
    window.scroll(0, 0);
    this.ngxLoader.stop();
  }

  onStep3PreviousButtonClick(): void {
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

  onStep4PreviousButtonClick(): void {
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

  onStep5PreviousButtonClick(): void {
    if (this.basket.length > 0) {
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
    } else {
      this.onStep4PreviousButtonClick();
    }
  }

  onAddFeatureToBasketButtonClick(feature) {
    this.logger.debug(`Basket before feature added: ${JSON.stringify(this.basket)}`);
    feature.in_basket = true;
    this.basket.push(feature);
    this.basketTotal = this.calculateBasketTotal('gbp');
    this.completionDate = this.calculateCompletionDate();
    this.logger.debug(`Basket after feature added: ${JSON.stringify(this.basket)}`);
  }

  onRemoveFeatureFromBasketButtonClick(feature) {
    this.setFeature(feature);
    this.logger.debug(`Basket before feature removed: ${JSON.stringify(this.basket)}`);
    this.logger.debug('Looping through basket items until item found');
    for (let i = 0; i < this.basket.length; i++) {
      this.logger.debug(this.basket[i]);
      if (this.basket[i]['id'] === feature.id) {
        this.logger.debug(`Found item to delete: ${JSON.stringify(this.basket[i])}`);
        this.basket.splice(i, 1);
      }
    }
    this.basketTotal = this.calculateBasketTotal(this.currency);
    this.logger.debug(`Basket after feature removed: ${JSON.stringify(this.basket)}`);
  }

  onBasketRemoveButtonClick(i, basketItem): void {
    this.logger.debug(`Deleting item at index ${i}: ${JSON.stringify(basketItem)}`);
    this.basket.splice(i, 1);
    this.basketTotal = this.calculateBasketTotal('gbp');
  }

  onChangeDeliverySpeed(changeContext: ChangeContext): void {
    this.logger.debug(`Delivery speed set to: ${JSON.stringify(changeContext)}`);
    if (changeContext.value === 0) {
      this.costMultiplier = this.taskService.relaxedCost;
      this.speedMultiplier = this.taskService.relaxedSpeed;
      this.deliverySpeed = changeContext.value;
    }
    if (changeContext.value === 1) {
      this.costMultiplier = this.taskService.standardCost;
      this.speedMultiplier = this.taskService.standardSpeed;
      this.deliverySpeed = changeContext.value;
    }
    if (changeContext.value === 2) {
      this.costMultiplier = this.taskService.primeCost;
      this.speedMultiplier = this.taskService.primeSpeed;
      this.deliverySpeed = changeContext.value;
    }
    this.basketTotal = this.calculateBasketTotal('gbp');
    this.completionDate = this.calculateCompletionDate();
    this.differenceInDays = this.calculateDateDifference();
    this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.basketTotal);
  }

  onCompleteCheckoutClick(): void {
    if (!this.carePlanSelected) {
      this.carePlanPrice = null;
    }
    this.taskService.createNewTask(
      this.user,
      this.productSelected,
      this.taskName,
      this.taskDescription,
      this.taskSimilarApps,
      this.categorySelected,
      this.basket,
      this.completionDate,
      this.currency,
      this.carePlanPrice,
      this.basketTotal,
      this.deliverySpeed);
    this.router.navigate(['checkout']);
  }

  onProjectSelectIndexChange(index: number): void {
    this.index = index;
    this.logger.debug('Swiper index: ', index);
  }

  onProjectSelectSwiperEvent(event: string): void {
    this.logger.debug('Swiper event: ', event);
    this.lastIndex = this.isScrolledIntoView('box-7');
    this.logger.debug(`Last index visible: ${this.lastIndex}`);
  }

  isFeatureInBasket(feature): boolean {
    const found = this.basket.some(e => e['id'] === feature.id);
    return found;
  }

  isScrolledIntoView(e): boolean {
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
