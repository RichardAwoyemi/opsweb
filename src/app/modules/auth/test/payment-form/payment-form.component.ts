import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { environment } from '../../../../../environments/environment';

import { NgForm } from '@angular/forms';

declare const Stripe: any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('cardInfo', {static: false}) cardInfo: ElementRef;

  stripe: any;
  elements;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  isMobile: Observable<BreakpointState>;

  constructor(private cd: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);

    this.stripe = Stripe(environment.stripeKey);
    this.elements = this.stripe.elements();
  }

  ngAfterViewInit() {
    const style = {
      /*base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }*/
    };
    this.card = this.elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', source);
      // ...send the token to the your backend to process the charge
    }
  }
}
