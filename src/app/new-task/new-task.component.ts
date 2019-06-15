import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
import * as introJs from 'intro.js/intro.js';
import { ModalService } from '../_services/modal.service';

declare var $;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnDestroy {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private scrollToService: ScrollToService,
    private ngxLoader: NgxUiLoaderService,
    private dataService: DataService,
    private modalService: ModalService,
    public taskService: TaskService,
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
  isAllWebCustomAlertSelected: boolean;
  webCustomAuth: any;
  webCustomAuthSubcription: Subscription;
  isAllWebCustomAuthSelected: boolean;
  webCustomEcommerce: any;
  webCustomEcommerceSubscription: Subscription;
  isAllWebCustomEcommerceSelected: boolean;
  webCustomFinance: any;
  webCustomFinanceSubscription: Subscription;
  isAllWebCustomFinanceSelected: boolean;
  webCustomGames: any;
  webCustomGamesSubscription: Subscription;
  isAllWebCustomGamesSelected: boolean;
  webCustomMultimedia: any;
  webCustomMultimediaSubscription: Subscription;
  isAllWebCustomMultimediaSelected: boolean;
  webCustomSocial: any;
  webCustomSocialSubscription: Subscription;
  isAllWebCustomSocialSelected: boolean;
  webCustomIntegrations: any;
  webCustomIntegrationsSubscription: Subscription;
  isAllWebCustomIntegrationsSelected: boolean;
  webCustomAdmin: any;
  webCustomAdminSubscription: Subscription;
  isAllWebCustomAdminSelected: boolean;
  webCustomContent: any;
  webCustomContentSubscription: Subscription;
  isAllWebCustomContentSelected: boolean;

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

  introJs = introJs();

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

    this.webCustomAdminSubscription = this.dataService.getAllWebCustomAdmin().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom admin:');
        this.logger.debug(response);
        this.webCustomAdmin = response;
      }
    });

    this.webCustomAlertSubscription = this.dataService.getAllWebCustomAlert().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom alert:');
        this.logger.debug(response);
        this.webCustomAlert = response;
      }
    });

    this.webCustomAuthSubcription = this.dataService.getAllWebCustomAuth().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom auth:');
        this.logger.debug(response);
        this.webCustomAuth = response;
      }
    });

    this.webCustomContentSubscription = this.dataService.getAllWebCustomContent().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom content:');
        this.logger.debug(response);
        this.webCustomContent = response;
      }
    });

    this.webCustomEcommerceSubscription = this.dataService.getAllWebCustomEcommerce().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom ecommerce:');
        this.logger.debug(response);
        this.webCustomEcommerce = response;
      }
    });

    this.webCustomFinanceSubscription = this.dataService.getAllWebCustomFinance().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom finance:');
        this.logger.debug(response);
        this.webCustomFinance = response;
      }
    });

    this.webCustomGamesSubscription = this.dataService.getAllWebCustomGames().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom games:');
        this.logger.debug(response);
        this.webCustomGames = response;
      }
    });

    this.webCustomIntegrationsSubscription = this.dataService.getAllWebCustomIntegrations().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom integrations:');
        this.logger.debug(response);
        this.webCustomIntegrations = response;
      }
    });

    this.webCustomMultimediaSubscription = this.dataService.getAllWebCustomMultimedia().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom ultimedia:');
        this.logger.debug(response);
        this.webCustomMultimedia = response;
      }
    });

    this.webCustomSocialSubscription = this.dataService.getAllWebCustomSocial().subscribe(response => {
      if (response) {
        this.logger.debug('Web custom social:');
        this.logger.debug(response);
        this.webCustomSocial = response;
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

    // Step 3 - for testing purposes
    this.step2Active = true;
    this.step3Active = true;
    this.step4Active = true;
    this.step5Active = true;
    this.taskName = 'Test Task';
    this.taskDescription = 'Test Description';
    const config: ScrollToConfigOptions = {
      target: 'step3'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
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

  setCarePlanButtonColour(value) {
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

  getFeatures(id) {
    if (id === 'web-custom-admin') {
      return this.webCustomAdmin;
    }
    if (id === 'web-custom-alert') {
      return this.webCustomAlert;
    }
    if (id === 'web-custom-auth') {
      return this.webCustomAuth;
    }
    if (id === 'web-custom-content') {
      return this.webCustomContent;
    }
    if (id === 'web-custom-ecommerce') {
      return this.webCustomEcommerce;
    }
    if (id === 'web-custom-finance') {
      return this.webCustomFinance;
    }
    if (id === 'web-custom-games') {
      return this.webCustomGames;
    }
    if (id === 'web-custom-integrations') {
      return this.webCustomIntegrations;
    }
    if (id === 'web-custom-multimedia') {
      return this.webCustomMultimedia;
    }
    if (id === 'web-custom-social') {
      return this.webCustomSocial;
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
    if (productId === 'web' || productId === 'mobile') {
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
    } else {
      this.modalService.displayMessage('Coming soon', 'We are currently hard at work on this feature. Please ' +
        'contact us at hello@opsonion.com for further details.');
    }
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
    this.startTour();
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

  calculateBasketTotalAndCompletionDate() {
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
  }

  isAllFeaturesSelected(featureId): boolean {
    if (featureId === 'web-custom-admin') {
      return this.isAllWebCustomAdminSelected;
    }
    if (featureId === 'web-custom-alert') {
      return this.isAllWebCustomAlertSelected;
    }
    if (featureId === 'web-custom-auth') {
      return this.isAllWebCustomAuthSelected;
    }
    if (featureId === 'web-custom-content') {
      return this.isAllWebCustomContentSelected;
    }
    if (featureId === 'web-custom-ecommerce') {
      return this.isAllWebCustomEcommerceSelected;
    }
    if (featureId === 'web-custom-finance') {
      return this.isAllWebCustomFinanceSelected;
    }
    if (featureId === 'web-custom-games') {
      return this.isAllWebCustomGamesSelected;
    }
    if (featureId === 'web-custom-multimedia') {
      return this.isAllWebCustomMultimediaSelected;
    }
    if (featureId === 'web-custom-social') {
      return this.isAllWebCustomSocialSelected;
    }
  }

  onSelectAllFeaturesButtonClick(featureId) {
    this.logger.debug(`Basket before features added: ${JSON.stringify(this.basket)}`);
    this.logger.debug(`Selecting all features for id: ${featureId}`);

    if (featureId === 'web-custom-admin') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomAdmin);
      }
      this.addFeaturesToBasket(this.webCustomAdmin);
      this.isAllWebCustomAdminSelected = true;
    }

    if (featureId === 'web-custom-alert') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomAlert);
      }
      this.addFeaturesToBasket(this.webCustomAlert);
      this.isAllWebCustomAlertSelected = true;
    }

    if (featureId === 'web-custom-auth') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomAuth);
      }
      this.addFeaturesToBasket(this.webCustomAuth);
      this.isAllWebCustomAuthSelected = true;
    }

    if (featureId === 'web-custom-content') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomContent);
      }
      this.addFeaturesToBasket(this.webCustomContent);
      this.isAllWebCustomContentSelected = true;
    }

    if (featureId === 'web-custom-ecommerce') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomEcommerce);
      }
      this.addFeaturesToBasket(this.webCustomEcommerce);
      this.isAllWebCustomEcommerceSelected = true;
    }

    if (featureId === 'web-custom-finance') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomFinance);
      }
      this.addFeaturesToBasket(this.webCustomFinance);
      this.isAllWebCustomFinanceSelected = true;
    }

    if (featureId === 'web-custom-games') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomGames);
      }
      this.addFeaturesToBasket(this.webCustomGames);
      this.isAllWebCustomGamesSelected = true;
    }

    if (featureId === 'web-custom-multimedia') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomMultimedia);
      }
      this.addFeaturesToBasket(this.webCustomMultimedia);
      this.isAllWebCustomMultimediaSelected = true;
    }

    if (featureId === 'web-custom-social') {
      if (this.basket.length > 0) {
        this.removeFeaturesFromBasket(this.webCustomSocial);
      }
      this.addFeaturesToBasket(this.webCustomSocial);
      this.isAllWebCustomSocialSelected = true;
    }

    this.calculateBasketTotalAndCompletionDate();
    this.logger.debug(`Basket after features added: ${JSON.stringify(this.basket)}`);
  }

  onDeselectAllFeaturesButtonClick(featureId) {
    this.logger.debug(`Basket before features removed: ${JSON.stringify(this.basket)}`);
    this.logger.debug(`Removing all features for id: ${featureId}`);

    if (featureId === 'web-custom-admin') {
      this.removeFeaturesFromBasket(this.webCustomAdmin);
      this.isAllWebCustomAdminSelected = false;
    }

    if (featureId === 'web-custom-alert') {
      this.removeFeaturesFromBasket(this.webCustomAlert);
      this.isAllWebCustomAlertSelected = false;
    }

    if (featureId === 'web-custom-auth') {
      this.removeFeaturesFromBasket(this.webCustomAuth);
      this.isAllWebCustomAuthSelected = false;
    }

    if (featureId === 'web-custom-content') {
      this.removeFeaturesFromBasket(this.webCustomContent);
      this.isAllWebCustomContentSelected = false;
    }

    if (featureId === 'web-custom-ecommerce') {
      this.removeFeaturesFromBasket(this.webCustomEcommerce);
      this.isAllWebCustomEcommerceSelected = false;
    }

    if (featureId === 'web-custom-finance') {
      this.removeFeaturesFromBasket(this.webCustomFinance);
      this.isAllWebCustomFinanceSelected = false;
    }

    if (featureId === 'web-custom-games') {
      this.removeFeaturesFromBasket(this.webCustomGames);
      this.isAllWebCustomGamesSelected = false;
    }

    if (featureId === 'web-custom-multimedia') {
      this.removeFeaturesFromBasket(this.webCustomMultimedia);
      this.isAllWebCustomMultimediaSelected = false;
    }

    if (featureId === 'web-custom-social') {
      this.removeFeaturesFromBasket(this.webCustomSocial);
      this.isAllWebCustomSocialSelected = false;
    }

    this.calculateBasketTotalAndCompletionDate();
    this.logger.debug(`Basket after features removed: ${JSON.stringify(this.basket)}`);
  }

  addFeaturesToBasket(features) {
    for (let i = 0; i < features.length; i++) {
      features[i].in_basket = true;
      this.basket.push(features[i]);
    }
  }

  removeFeaturesFromBasket(features) {
    for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < this.basket.length; j++) {
        if (features[i].id === this.basket[j].id) {
          features[i].in_basket = false;
          this.basket.splice(j, 1);
        }
      }
    }
  }

  onAddFeatureToBasketButtonClick(feature) {
    this.logger.debug(`Basket before feature added: ${JSON.stringify(this.basket)}`);
    feature.in_basket = true;
    this.basket.push(feature);
    this.calculateBasketTotalAndCompletionDate();
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
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.logger.debug(`Basket after feature removed: ${JSON.stringify(this.basket)}`);
  }

  onBasketRemoveButtonClick(i, basketItem): void {
    this.logger.debug(`Deleting item at index ${i}: ${JSON.stringify(basketItem)}`);
    this.basket.splice(i, 1);
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
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
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.differenceInDays = this.taskService.calculateDateDifference(this.basket, this.speedMultiplier);
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

  startTour() {
    this.introJs.setOptions({
      scrollToElement: false,
      showStepNumbers: false,
      steps: [
        {
          element: document.querySelector('#categories-column'),
          intro: 'Some text about introduction and categories',
          position: 'right'
        },
        {
          element: document.querySelector('#features-column'),
          intro: 'Some text about feature library',
          position: 'right'
        },
        {
          element: document.querySelector('#information-column'),
          intro: 'Some text about information column',
          position: 'left'
        },
        {
          element: document.querySelector('#basket-button'),
          intro: 'Some text about basket',
          position: 'bottom'
        }
      ]
    });
    this.introJs.start();
  }

  ngOnDestroy() {
    if (this.webCategoriesSubscription) {
      this.webCategoriesSubscription.unsubscribe();
    }
    if (this.webCustomSubscription) {
      this.webCustomSubscription.unsubscribe();
    }
    if (this.webCustomAlertSubscription) {
      this.webCustomAlertSubscription.unsubscribe();
    }
    if (this.webCustomAuthSubcription) {
      this.webCustomAuthSubcription.unsubscribe();
    }
    if (this.webCustomFinanceSubscription) {
      this.webCustomFinanceSubscription.unsubscribe();
    }
    if (this.webCustomGamesSubscription) {
      this.webCustomGamesSubscription.unsubscribe();
    }
    if (this.similarAppsSubscription) {
      this.similarAppsSubscription.unsubscribe();
    }
  }
}
