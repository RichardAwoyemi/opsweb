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

  authLibraries = [
    {
      id: 'email-login',
      name: 'Email Login'
    },
    {
      id: 'facebook-login',
      name: 'Facebook Login'
    },
    {
      id: 'google-login',
      name: 'Google Login'
    },
    {
      id: 'guest-login',
      name: 'Guest Login'
    },
    {
      id: 'twitter-login',
      name: 'Twitter Login'
    },
    {
      id: 'forgot-password',
      name: 'Forgot Password'
    }
  ];

  ecommerceLibraries = [
    {
      id: 'affiliate-url',
      name: 'Affiliate URL'
    },
    {
      id: 'bidding',
      name: 'Bidding'
    },
    {
      id: 'coupons',
      name: 'Coupons'
    },
    {
      id: 'discounts',
      name: 'Discounts'
    },
    {
      id: 'shopping-cart',
      name: 'Shopping Cart'
    },
    {
      id: 'wishlist',
      name: 'Wishlist'
    }
  ];

  financeLibraries = [
    {
      id: 'invoice-billing',
      name: 'Invoice Billing'
    },
    {
      id: 'payments',
      name: 'Payments'
    },
    {
      id: 'multiple-currency-support',
      name: 'Multiple Currency Support'
    },
    {
      id: 'split-payments',
      name: 'Split Payments'
    },
    {
      id: 'subscription-billing',
      name: 'Subscription Billing'
    }
  ];

  gameLibraries = [
    {
      id: 'leaderboard',
      name: 'Leaderboard'
    }
  ];

  alertLibraries = [
    {
      id: 'desktop-notifications',
      name: 'Desktop Notifications'
    },
    {
      id: 'email-notifications',
      name: 'Email Notifications'
    },
    {
      id: 'notification-console',
      name: 'Notification Console'
    },
    {
      id: 'notification-settings',
      name: 'Notification Settings'
    }
  ];

  multimediaLibraries = [
    {
      id: 'archive',
      name: 'Archive'
    },
    {
      id: 'bookmark',
      name: 'Bookmark'
    },
    {
      id: 'gallery',
      name: 'Gallery'
    },
    {
      id: 'groups',
      name: 'Groups'
    },
    {
      id: 'video-chat',
      name: 'Video Chat'
    }
  ];

  socialLibraries = [
    {
      id: 'activity-feed',
      name: 'Activity Feed'
    },
    {
      id: 'add-friends',
      name: 'Add Friends/Followers'
    },
    {
      id: 'chat',
      name: 'Chat'
    },
    {
      id: 'chat-backup',
      name: 'Chat Backup/Restore'
    },
    {
      id: 'comments',
      name: 'Comments'
    },
    {
      id: 'emojis',
      name: 'Emojis'
    },
    {
      id: 'event-registration',
      name: 'Event Registration'
    },
    {
      id: 'friend-list',
      name: 'Friend/Follower List'
    },
    {
      id: 'group-chat',
      name: 'Group Chat'
    },
    {
      id: 'hashtags',
      name: 'Hashtags'
    }
  ];

  isMobile: Observable<BreakpointState>;
  task: any;
  innerHeight: number;
  innerColumnHeight: number;
  innerColumnSidebarHeight: number;

  @ViewChild('resetModal') resetModal: ElementRef;
  @ViewChild('requestFeatureModal') requestFeatureModal: ElementRef;

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.task = window.localStorage.getItem('tasks');
    this.innerHeight = window.innerHeight;
    this.innerColumnHeight = window.innerHeight - 67;
    this.innerColumnSidebarHeight = window.innerHeight - 125;
    this.logger.debug('Current task is:');
    this.logger.debug(this.task);
    this.logger.debug(`Window height is: ${this.innerHeight}`);

    // temp for testing
    const config: ScrollToConfigOptions = {
      target: 'step2'
    };
    this.scrollToService.scrollTo(config);
    document.body.style.overflow = 'hidden';
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
    document.body.style.overflow = 'hidden';
    this.ngxLoader.stop();
  }

  selectCategory(categoryId) {
    this.logger.debug(`Category selected: ${categoryId}`);
    this.categorySelected = categoryId;
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

  reset() {
    $(this.resetModal.nativeElement).modal('hide');
    this.productSelected = null;
    this.categorySelected = null;
    document.body.style.overflow = '';
    window.scroll(0, 0);
  }

  showResetModal() {
    $(this.resetModal.nativeElement).modal('show', { size: 'sm' });
  }

  showRequestFeatureModal() {
    $(this.requestFeatureModal.nativeElement).modal('show', { size: 'lg' });
  }

  public onIndexChange(index: number): void {
    this.index = index;
    this.logger.debug('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    this.logger.debug('Swiper event: ', event);
  }
}
