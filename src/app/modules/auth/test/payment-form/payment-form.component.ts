import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { environment } from '../../../../../environments/environment';
import { PaymentService } from '../../../../shared/services/payment.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../shared/services/firebase.service';
import { NGXLogger } from 'ngx-logger';

declare const Stripe: any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit, AfterViewInit {
  isMobile: Observable<BreakpointState>;

  newTaskDetails: any;
  newTaskDetailsSubscription: Subscription;

  handler: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private paymentService: PaymentService,
    private firebaseService: FirebaseService,
    public router: Router,
    private logger: NGXLogger
  ) { }

  @Input() amount: number;
  @Input() description: string;

  @ViewChild('checkoutForm', {static: false}) form: ElementRef;
  @ViewChild('checkoutContainer', {static: false}) checkout: ElementRef;
  @ViewChild('reset', {static: false}) resetButton: ElementRef;
  @ViewChild('error', {static: false}) error: ElementRef;
  @ViewChild('errorMessage', {static: false}) errorMessage: ElementRef;

  @ViewChild('address', {static: false}) address1: ElementRef;
  @ViewChild('city', {static: false}) city: ElementRef;
  @ViewChild('state', {static: false}) state: ElementRef;
  @ViewChild('zip', {static: false}) zip: ElementRef;
  @ViewChild('submit', {static: false}) submit: ElementRef;

  listener;

  email;
  name;

  cardNumber;
  cardExpiry;
  cardCvc;

  stripe;
  currency;

  savedErrors = {};
  validateInputs = {};

  loading = false;
  confirmation;

  style = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: 'black',
      },
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
    this.addFocusBlurAndKeyUpAnimationsToInputs();

    this.stripe = Stripe(environment.stripeKey);
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber', {
      style: this.style,
      classes: this.elementClasses,
    });
    this.cardNumber.mount('#card-number');

    this.cardExpiry = elements.create('cardExpiry', {
      style: this.style,
      classes: this.elementClasses,
    });
    this.cardExpiry.mount('#card-expiry');

    this.cardCvc = elements.create('cardCvc', {
      style: this.style,
      classes: this.elementClasses,
    });
    this.cardCvc.mount('#card-cvc');
  }

  ngAfterViewInit() {
    this.listener = this.onInputsKeyUp.bind(this);
    const cardInputs = [this.cardNumber, this.cardExpiry, this.cardCvc];
    this.disableSubmitButton();
    for (let i = 0; i < cardInputs.length; i++) {
      cardInputs[i].addEventListener('change', this.listener);
    }
  }

  onInputsKeyUp(event) {
    const id = event.elementType ? event.elementType : event.target.id;
    if (event.elementType) {
      this.checkForCardErrorMessages(event, id);
      this.setCardDetailsCompleteness(event, id);
    }
    this.validateAllFields();
  }

  validateAllFields() {
    this.validateInputs['address'] = this.address1.nativeElement.validity.valid;
    this.validateInputs['city'] = this.city.nativeElement.validity.valid;
    this.validateInputs['state'] = this.state.nativeElement.validity.valid;
    this.validateInputs['zip'] = this.zip.nativeElement.validity.valid;

    //this.logger.debug(this.validateInputs);

    if (this.validateInputs['address'] && this.validateInputs['city']
     && this.validateInputs['zip'] && this.validateInputs['cardNumber']
     && this.validateInputs['cardCvc'] && this.validateInputs['cardExpiry']
     && this.errorMessage.nativeElement.innerHTML === '') {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  setCardDetailsCompleteness(event, id) {
    this.validateInputs[id] = event.complete;
  }

  checkForCardErrorMessages(event, id) {
    this.logger.debug(event);
    if (event.error) {
      this.error.nativeElement.classList.remove('hidden');
      this.savedErrors[id] = event.error.message;
      this.errorMessage.nativeElement.innerHTML = event.error.message;
    } else {
      this.savedErrors[id] = null;

      // Loop over the saved errors and find the first one, if any.
      const sE = this.savedErrors;
      const nextError = Object.keys(this.savedErrors)
        .sort()
        .reduce(function(maybeFoundError, key) {
          return maybeFoundError || sE[key];
        }, null);

      if (nextError) {
        // Now that they've fixed the current error, show another one.
        this.errorMessage.nativeElement.innerHTML = nextError;
      } else {
        // The user fixed the last error; no more errors.
        this.errorMessage.nativeElement.innerHTML = '';
        this.error.nativeElement.classList.add('hidden');
      }
    }
  }

  addFocusBlurAndKeyUpAnimationsToInputs() {
    const inputs = document.querySelectorAll('.input');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('focus', function () {
        input.classList.add('focused');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('focused');
      });
      input.addEventListener('keyup', function () {
        if (input.value.length === 0) {
          input.classList.add('empty');
        } else {
          input.classList.remove('empty');
        }
      });
    });
  }

  enableSubmitButton() {
    this.submit.nativeElement.removeAttribute('disabled');
  }

  disableSubmitButton() {
    this.submit.nativeElement.setAttribute('disabled', 'true');
  }

  enableInputs() {
    Array.prototype.forEach.call(
      this.form.nativeElement.querySelectorAll('.input'),
      function (input) {
        input.removeAttribute('disabled');
      }
    );
  }

  disableInputs() {
    Array.prototype.forEach.call(
      this.form.nativeElement.querySelectorAll('.input'),
      function (input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  async onSubmitCardClick(e) {
    e.preventDefault();

    // The only way to trigger HTML5 form validation UI is to fake a user submit event.
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    this.form.nativeElement.appendChild(submit);
    submit.click();
    submit.remove();

    // Show a loading screen...
    this.checkout.nativeElement.classList.add('submitting');

    this.disableInputs();

    // Gather additional customer data we may have collected in our form.
    const additionalData = {
      amount: this.amount ? this.amount * 100 : undefined,
      currency: this.currency,
      owner: {
        name: this.name ? this.name : undefined,
        email: this.email ? this.email : undefined,
        address: {
          line1: this.address1 ? this.address1.nativeElement.value : undefined,
          city: this.city ? this.city.nativeElement.value : undefined,
          state: this.state ? this.state.nativeElement.value : undefined,
          postal_code: this.zip ? this.zip.nativeElement.value : undefined,
        }
      }
    };

    const id = '1';

    const { source, error } = await this.stripe.createSource(this.cardNumber, additionalData);
    if (source) {
      this.logger.debug('Created source object');
      const clientSecret = await this.paymentService.getSetupIntentClientSecret(id);
      if (clientSecret) {
        this.logger.debug('Successfully obtained clientSecret');
        const { setupIntent, error2 } = await this.stripe.confirmCardSetup(clientSecret, source);
        if (setupIntent.status === 'succeeded') {
          this.logger.debug('Successfully confirmed card setup');
          this.paymentService.addNewUserPaymentMethods(id, setupIntent);
          // Stop loading!
          this.checkout.nativeElement.classList.add('submitted');
          //this.confirmation = this.paymentService.submitStripeCharge(source, this.amount, this.currency);
          localStorage.removeItem('newTaskDocRef');
          //setTimeout(() => { this.router.navigate(['dashboard']); }, 5000);
        } else {
          this.logger.error('There was an error confirming card setup', error2);
          this.onFailedPaymentMethod();
        }
      } else {
        this.logger.error('There was an error obtaining clientSecret!');
        this.onFailedPaymentMethod();
      }
    } else {
      this.logger.error('Could not create a source from provided details', error);
      this.onFailedPaymentMethod();
    }
  }

  onFailedPaymentMethod() {
    this.checkout.nativeElement.classList.remove('submitting');
    this.enableInputs();
  }
}


