import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subscription, timer } from 'rxjs';
import { Price } from './prices';
import { PricesService } from 'src/providers/prices/prices.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './prices.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, visibility: 'visible' })),
      state('out', style({ opacity: 0, visibility: 'hidden' })),
      transition('in <=> out', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class PricesComponent implements OnInit {

  constructor(
    private _prices: PricesService,
    private _sanitizer: DomSanitizer
  ) { }

  public loaded = false;
  public fadeInState = 'in';
  public fadeOutState = 'out';

  prices: Price[];
  public pricesData: any[];
  private getPriceData: any;

  private cryptoNames: string[];
  private cryptoImages: string[];
  private cryptoLastPrices: number[];
  private cryptoPriceCompare: number[];

  private _placeholderBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABS2lUWHRYTU' +
    'w6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV' +
    '0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2' +
    'LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtb' +
    'nMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+' +
    'LUNEtwAAAClJREFUSIntzTEBAAAIwzDAv+dhAr5UQNNJ6rN5vQMAAAAAAAAAAIDDFsfxAz1KKZktAAAAAElFTkSuQmCC';
  private _placeHolderSafe: SafeUrl;

  private showloader = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  private _sortValue = null;
  private _sortName = null;
  private _loading = true;
  private _current = 1;
  private _index = 1;
  private _changeIndex = false;
  private _pageSize = 20;
  private _sortMap = {
    name: null,
    symbol: null
  };

  _searchText = '';
  input_id = '';
  private _searchResult = false;

  // State change after image is fully loaded
  public isLoaded(event: Event) {
    this.loaded = true;
    this.fadeInState = 'out';
    this.fadeOutState = 'in';
  }

  ngOnInit() {
    this.refreshData();
  }

  sort(sortName: string, sortEvent: string) {
    this._sortValue = sortEvent;
    this._sortName = sortName;
    if (environment.production === false) {
      console.log(this._sortValue);
    }
    Object.keys(this._sortMap).forEach(key => {
      if (key !== sortName) {
        this._sortMap[key] = null;
      } else {
        this._sortMap[key] = sortEvent;
      }
    });
    this._prices.reseverState(this._current, this._pageSize, this._sortMap.name, this._sortMap.symbol);
    this.refreshData();
  }

  refreshData(reset: boolean = false) {
    // Reset table index to 1
    if (reset) {
      this._prices._previousIndex = 1;
    }

    // Set table page index and size to previous resevered data
    if (this._prices._previousIndex !== null && this._prices._previousPageSize !== null) {
      this._current = this._prices._previousIndex;
      this._pageSize = this._prices._previousPageSize;
      this._sortMap.name = this._prices._previousSortMapName;
      this._sortMap.symbol = this._prices._previousSortMapSymbol;

      if (environment.production === false) {
        console.log('reserve data called');
      }
    }

    this._loading = true;
    // Sort dataset before getting it
    if (this._sortName !== null || this._sortValue !== null) {
      this._prices.sortData(this._sortName, this._sortValue);
      if (environment.production === false) {
        console.log('sort method called');
      }
    }

    this.pricesData = [];
    this.cryptoLastPrices = [];
    this.cryptoPriceCompare = [];
    this.cryptoNames = this._prices.getNamesFull();
    this.cryptoImages = this._prices.getImagesFull();
    this._placeHolderSafe = this._sanitizer.bypassSecurityTrustUrl(this._placeholderBase64);

    this._prices.getPricesFull()
      .subscribe(res => {
        this.getPriceData = res.DISPLAY;
        if (environment.production === false) {
          console.log(this.getPriceData);
        }
        const coinKeys: any = Object.keys(this.getPriceData);
        const coinValues: any = Object.values(this.getPriceData);

        // Price compare first time check
        if (this.cryptoLastPrices.length === 0) {
          for (let _i = 0; _i < coinKeys.length; _i++) {
            const _currentPrice = parseFloat((coinValues[_i].GBP.PRICE).substring(2).replace(/,/g, ''));
            this.cryptoLastPrices[_i] = _currentPrice;
            this.cryptoPriceCompare[_i] = _currentPrice - this.cryptoLastPrices[_i];
          }
        } else {
          for (let _i = 0; _i < coinKeys.length; _i++) {
            this.cryptoPriceCompare[_i] = (parseFloat((coinValues[_i].GBP.PRICE).substring(2).replace(/,/g, '')) -
              this.cryptoLastPrices[_i]);
          }
        }
        if (environment.production === false) {
          console.log(this.cryptoLastPrices);
        }

        for (let _i = 0; _i < coinKeys.length; _i++) {
          this.pricesData[coinKeys[_i]] = {
            image: this.cryptoImages[_i],
            name: this.cryptoNames[_i],
            symbol: coinKeys[_i],
            price: coinValues[_i].GBP.PRICE,
            marketCap: coinValues[_i].GBP.MKTCAP,
            change24Num: parseFloat((coinValues[_i].GBP.CHANGE24HOUR).substring(2).replace(/,/g, '')),
            priceCompare: this.cryptoPriceCompare[_i]
          };

          this.cryptoLastPrices[_i] = parseFloat((coinValues[_i].GBP.PRICE).substring(2).replace(/,/g, ''));
          this.prices = JSON.parse(JSON.stringify(Object.values(this.pricesData)));
        }
        if (environment.production === false) {
          console.log(Object.values(this.pricesData));
        }
        this._loading = false;
        this.setTimer();
      }
    );
  }

  setTimer() {
    // Set showloader to true to show colored div on view
    this.showloader = true;
    this.timer = timer(1500);

    this.subscription = this.timer.subscribe(() => {
      // Set showloader to false to hide colored div from view after 1.5 seconds
      this.showloader = false;
    });
  }
}
