import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
import { Price } from '../../_models/markets';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketsService } from 'src/app/_services/markets.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './price.component.html'
})
export class PriceComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  cryptoPrice: Price;
  private symbol: string;
  private price: string;
  private name: string;
  private image: string;
  private chart: any;
  private selectedType: string;
  private timeLimit: number;
  private aggregate: number;
  private selectedIndex = 0;
  private tabs = [
    {
      name: '24 HOURS',
      index: 0,
      content: this.chart
    },
    {
      name: '7 DAYS',
      index: 1,
      content: this.chart
    },
    {
      name: '1 MONTH',
      index: 2,
      content: this.chart
    },
    {
      name: '1 YEAR',
      index: 3,
      content: this.chart
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _prices: MarketsService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset);

    if (this._route.snapshot.paramMap.get('symbol') !== null) {
      this.symbol = this._route.snapshot.paramMap.get('symbol').toUpperCase();
    }

    if (this._prices.getNameSingle(this.symbol) == null) {
      this._router.navigate(['/']);
    } else {
      this.name = this._prices.getNameSingle(this.symbol);
      this._prices.getPriceSingle(this.symbol)
        .subscribe(result => {
          this.price = result.GBP;
          this.cryptoPrice = {
            image: '',
            name: this.name,
            symbol: this.symbol,
            price: this.price,
            marketCap: '',
            change24Num: 0,
            priceCompare: 0
          };

          if (environment.production === false) {
            console.log(this.cryptoPrice);
          }
          this.drawChart('A', 1440, 15);
        });
    }
  }

  drawChart(type: string, timelimit: number, aggregate: number): any {
    if (this.chart != null) {
      this.chart.destroy();
    }
    Chart.defaults.global.defaultFontFamily = 'Avenir Next Medium, Helvetica, sans-serif';
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    });
  }
}
