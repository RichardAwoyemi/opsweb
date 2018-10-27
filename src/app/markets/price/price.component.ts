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

  constructor(private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _prices: MarketsService,
    private _route: ActivatedRoute) { }
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

  private chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 50,
        bottom: 0
      }
    },
    tooltips: {
      mode: 'label',
      intersect: false,
      titleFontColor: '#7289a1',
      bodyFontSize: 14,
      bodyFontStyle: 'bold',
      bodySpacing: 6,
      yPadding: 8,
      custom: function (tooltip) {
        // remove color square label
        if (!tooltip) { return; }
        // disable displaying the color box;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function (tooltipItem, data) {
          // Add a pound sign, rounding, and thousands commas
          return '£ ' + Number(tooltipItem.yLabel).toFixed(2).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
          });
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        borderWidth: 2,
        hitRadius: 8,
        hoverRadius: 6
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          maxRotation: 0,
          fontSize: 12,
          fontStyle: 'bold',
          fontColor: '#7289a1',
          padding: 8
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        position: 'right',
        display: true,
        gridLines: {
          drawBorder: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return '£ ' + Number(value).toFixed(2);
          },
          autoSkip: true,
          maxTicksLimit: 5,
          fontSize: 12,
          fontStyle: 'bold',
          padding: 10
        },
      }],
    }
  };

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);

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

  selectChange() {
    switch (this.selectedIndex) {
      case 0: {
        this.selectedType = "A";
        this.timeLimit = 1440;
        this.aggregate = 15;
        this.drawChart(this.selectedType, this.timeLimit, this.aggregate);
        break;
      }
      case 1: {
        this.selectedType = "B";
        this.timeLimit = 168;
        this.aggregate = 1;
        this.drawChart(this.selectedType, this.timeLimit, this.aggregate);
        break;
      }
      case 2: {
        this.selectedType = "C";
        this.timeLimit = 720;
        this.aggregate = 10;
        this.drawChart(this.selectedType, this.timeLimit, this.aggregate);
        break;
      }
      case 3: {
        this.selectedType = "D";
        this.timeLimit = 365;
        this.aggregate = 2;
        this.drawChart(this.selectedType, this.timeLimit, this.aggregate);
        break;
      }
    }
  }

  drawChart(type: string, timeLimit: number, aggregate: number): any {
    if (this.chart != null) {
      this.chart.destroy();
    }

    Chart.defaults.global.defaultFontFamily = 'Avenir Next Medium, Helvetica, sans-serif';
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          const activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#f7f7f7';
          ctx.stroke();
          ctx.restore();
        }
      }
    });

    let priceChart: any, allDates: any, cryptoDates: any[];
    let prefix: string;
    let canvasId: string;

    switch (type) {
      case 'A': {
        canvasId = 'canvas-0';
        prefix = 'histominute';
        break;
      }
      case 'B': {
        canvasId = 'canvas-1';
        prefix = 'histohour';
        break;
      }
      case 'C': {
        canvasId = 'canvas-2';
        prefix = 'histohour';
        break;
      }
      case 'D': {
        canvasId = 'canvas-3';
        prefix = 'histoday';
        break;
      }
    }

    this._prices.getHistoricalPrices(this.symbol, prefix, timeLimit, aggregate).subscribe(res => {
      if (environment.production === false) {
        console.log(res.Data);
        console.log(res.Data.length);
      }

      priceChart = res['Data'].map(res => res.close);
      allDates = res['Data'].map(res => res.time);

      if (environment.production === false) {
        console.log(priceChart);
      }

      cryptoDates = [];
      allDates.forEach(() => {
        const jsDate = new Date(res * 1000);
        cryptoDates.push(jsDate.toLocaleTimeString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }));
      });

      // Draw new chart

      this.chart = new Chart(canvasId, {
        type: 'LineWithLine',
        data: {
          labels: cryptoDates,
          datasets: [
            {
              data: priceChart,
              borderColor: '#60acf3',
              cubicInterpolationMode: 'monotone',
              fill: false
            }
          ]
        },
        options: this.chartOptions
      });
    });
  }
}
