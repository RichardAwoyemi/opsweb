import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarketsService {
  private symbolNameData: any = {
    'Bitcoin': 'BTC',
    'Ethereum': 'ETH',
    'Ripple': 'XRP',
    'Bitcoin Cash': 'BCH',
    'Litecoin': 'LTC',
    'Cardano': 'ADA',
    'NEO': 'NEO',
    'Stellar': 'XLM',
    'Monero': 'XMR',
    'EOS': 'EOS',
    'IOTA': 'IOT',
    'Dash': 'DASH',
    'NEM': 'XEM',
    'TRON': 'TRX',
    'Ethereum Classic': 'ETC',
    'Tether': 'USDT',
    'VeChain': 'VEN',
    'Qtum': 'QTUM',
    'Nano': 'XRB',
    'Lisk': 'LSK',
    'Bitcoin Gold': 'BTG',
    'OmiseGo': 'OMG',
    'ICON': 'ICX',
    'Zcash': 'ZEC',
    'Digix DAO': 'DGD',
    'Binance Coin': 'BNB',
    'Steem': 'STEEM',
    'Verge': 'XVG',
    'Stratis': 'STRAT',
    'Populous': 'PPT',
    'ByteCoin': 'BCN',
    'Waves': 'WAVES',
    'Siacoin': 'SC',
    'Status': 'SNT',
    'RChain': 'RHOC',
    'Maker': 'MKR',
    'DogeCoin': 'DOGE',
    'Bitshares': 'BTS',
    'Decred': 'DCR',
    'Aeternity': 'AE',
    'Waltonchain': 'WTC',
    'Augur': 'REP',
    'Electroneum': 'ETN',
    '0x': 'ZRX',
    'Komodo': 'KMD',
    'Bytom': 'BTM',
    'ARK': 'ARK',
    'Veritaseum': 'VERI',
    'Ardor': 'ARDR',
    'Golem': 'GNT',
    'Dragonchain': 'DRGN',
    'Hshare': 'HSR',
    'BAT': 'BAT',
    'Cryptonex': 'CNX',
    'SysCoin': 'SYS',
    'Zilliqa': 'ZIL',
    'KuCoin': 'KCS',
    'DigiByte': 'DGB',
    'Ethos': 'BQX',
    'Gas': 'GAS'
  };

  private defaultDataCopy: any = { ...this.symbolNameData };
  private priceMultiurl: string;
  private imageurlPrefix = './assets/img/crypto-icons/';
  private imageurlSuffix: string[];
  private images: any[];
  private timer = timer(0, 15000);

  public _previousIndex: number = null;
  public _previousData: any = null;
  public _previousPageSize: number = null;
  public _previousSortMapName: string = null;
  public _previousSortMapSymbol: string = null;
  private _filterd = false;

  constructor(private _http: HttpClient) { }

  // Return filtered coin list
  filter(searchText: string): boolean {

    // Recover default data set before filter
    this.symbolNameData = this.defaultDataCopy;

    // If search text is not empty, find fuzzy match and convert to the same object structure
    if (searchText !== '') {
      const data: any[] = (JSON.stringify(this.symbolNameData)).replace(/{|}/g, '').split(',')
        .filter((el) => el.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      if (environment.production === false) {
        console.log(data);
      }
      if (data.length === 0) {
        this._filterd = false;
        return false;
      }
      const arr: any[] = [];
      data.forEach(function (el) {
        const temp = el.replace(/"/g, '').split(':');
        arr.push(temp);
      });
      if (environment.production === false) {
        console.log(arr);
      }
      this.symbolNameData = arr.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
      if (environment.production === false) {
        console.log(this.symbolNameData);
      }
      this._filterd = true;
      return true;
    } else {

      // If search text is empty, recover from copy
      this._filterd = false;
      this.symbolNameData = this.defaultDataCopy;
      return true;
    }
  }

  // Sort data by coin name or coin symbol
  sortData(sortName: string, sortOrder: string) {
    if (environment.production === false) {
      console.log(sortName, sortOrder);
    }
    switch (sortName) {
      case 'name': {
        if (sortOrder === 'ascend') {
          this.symbolNameData = Object.keys(this.symbolNameData).sort().reduce((r, k) => (r[k] = this.symbolNameData[k], r), {});
        } else if (sortOrder === 'descend') {
          this.symbolNameData = Object.keys(this.symbolNameData).sort((a, b) => b.localeCompare(a))
            .reduce((r, k) => (r[k] = this.symbolNameData[k], r), {});
        } else {
          if (!this._filterd) {
            this.symbolNameData = this.defaultDataCopy;
            if (environment.production === false) {
              console.log('Use copy data');
            }
          } else {
            this.symbolNameData = this._previousData;
            if (environment.production === false) {
              console.log('Use previous data');
            }
          }
          if (environment.production === false) {
            console.log(this.symbolNameData);
          }
        }
        break;
      }
      case 'symbol': {
        if (sortOrder === 'ascend') {
          this.symbolNameData = Object.keys(this.symbolNameData).sort((a, b) =>
            this.symbolNameData[a].localeCompare(this.symbolNameData[b]))
            .reduce((r, k) => (r[k] = this.symbolNameData[k], r), {});
          if (environment.production === false) {
            console.log(this.symbolNameData);
          }
        } else if (sortOrder === 'descend') {
          this.symbolNameData = Object.keys(this.symbolNameData).sort((a, b) =>
            this.symbolNameData[b].localeCompare(this.symbolNameData[a]))
            .reduce((r, k) => (r[k] = this.symbolNameData[k], r), {});
        } else {
          if (!this._filterd) {
            this.symbolNameData = this.defaultDataCopy;
          } else {
            this.symbolNameData = this._previousData;
            if (environment.production === false) {
              console.log('Use previous data');
            }
          }
        }
        if (environment.production === false) {
          console.log(this.symbolNameData);
        }
        break;
      }
      default: {
        if (environment.production === false) {
          console.log('sort default called');
        }
        this.symbolNameData = this.defaultDataCopy;
      }
    }

    console.log(this.symbolNameData);
  }

  // Keep previous table state data
  reseverState(currentIndex: number, pageSize: number, sortMapName: string, sortMapSymbol: string): void {
    this._previousIndex = currentIndex;
    this._previousPageSize = pageSize;
    this._previousSortMapName = sortMapName;
    this._previousSortMapSymbol = sortMapSymbol;
    this._previousData = { ...this.symbolNameData };
  }

  // Fetch price data every 15 seconds
  getPricesFull(): Observable<any> {
    const coinlist: string[] = Object.values(this.symbolNameData);
    if (environment.production === false) {
      console.log(this.symbolNameData);
    }
    this.priceMultiurl = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
      coinlist.join() + '&tsyms=GBP&extraParams=Cryptocurrency_Market';

    // Interval is set to 15000 (15s)
    return this.timer
      .pipe(mergeMap(() => this._http.get(this.priceMultiurl)
        .pipe(catchError(this.handleError('getPricesFull', [])))));
  }

  // Fetch single price data
  getPriceSingle(symbol: string): Observable<any> {
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=' +
      symbol + '&tsyms=GBP&extraParams=Cryptocurrency_Market')
      .pipe(map((result: any) => result))
      .pipe(catchError(this.handleError('getPriceSingle', [])));
  }

  // Return all coin names as arrays
  getNamesFull(): string[] {
    if (environment.production === false) {
      console.log(Object.keys(this.symbolNameData));
    }
    return Object.keys(this.symbolNameData);
  }

  // Return coin name by symbol
  getNameSingle(symbol: string): string {
    return Object.keys(this.symbolNameData).find(key => this.symbolNameData[key] === symbol);
  }

  // Get all img paths
  getImagesFull(): any[] {
    const coinlist: string[] = Object.values(this.symbolNameData);
    this.images = [];

    this.imageurlSuffix = coinlist.map(res => res.toLowerCase());
    for (const symbol of this.imageurlSuffix) {
      this.images.push(this.imageurlPrefix + symbol + '.svg');
    }

    return this.images;
  }

  // Get single img path
  getImageSingle(symbol: string): string {
    return this.imageurlPrefix + symbol.toLowerCase() + '.svg';
  }

  // Fetch minute, hourly, daily price of historical data
  getHistoricalPrices(symbol: string, prefix: string, timelimit: number, aggregate: number): Observable<any> {
    if (environment.production === false) {
      console.log(this._http.get('https://min-api.cryptocompare.com/data/' + prefix + '?fsym=' + `${symbol}` +
      '&tsym=GBP&limit=' + timelimit + '&aggregate=' + aggregate));
    }
    return this._http.get('https://min-api.cryptocompare.com/data/' + prefix + '?fsym=' + `${symbol}` +
      '&tsym=GBP&limit=' + timelimit + '&aggregate=' + aggregate + '&extraParams=Cryptocurrency_Market')
      .pipe(map((result: any) => result))
      .pipe(catchError(this.handleError(`getHistoricalPrices symbol=${symbol}`)));
  }

  /**
   * Handle HTTP operation that failed.
   * Ensure the app continues.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Log to console instead
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /**
   * Below are functions only used in testing
   */
  setCoinData(coins: any) {
    this.symbolNameData = coins;
  }
}
