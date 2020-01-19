import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PaymentService } from '../../../../shared/services/payment.service';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

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
    public router: Router,
    private logger: NGXLogger
  ) { }

  @Input() amount: number;
  @Input() description: string;

  @ViewChild('checkoutForm', {static: false}) form: ElementRef;
  @ViewChild('checkoutContainer', {static: false}) checkout: ElementRef;
  @ViewChild('reset', {static: false}) resetButton: ElementRef;
  @ViewChild('error', {static: false}) error: ElementRef;
  @ViewChild('success', {static: false}) success: ElementRef;
  @ViewChild('errorMessage', {static: false}) errorMessage: ElementRef;
  @ViewChild('authorise', {static: false}) authorise: ElementRef;
  @ViewChild('exists', {static: false}) exists: ElementRef;

  @ViewChild('address', {static: false}) address1: ElementRef;
  @ViewChild('city', {static: false}) city: ElementRef;
  @ViewChild('state', {static: false}) state: ElementRef;
  @ViewChild('zip', {static: false}) zip: ElementRef;
  @ViewChild('submit', {static: false}) submit: ElementRef;
  @ViewChild('title', {static: false}) title: ElementRef;

  FormAction = {
    CONIRM_AUTH: 'CONIRM_AUTH',
    DECLINE_AUTH: 'DECLINE_AUTH',
    SUBMIT_CARD: 'SUBMIT_CARD'
  };

  // TODO: replace with the authenticated user Id
  userId = '1';

  paymentMethod;

  listener;

  email;
  name;
  billingDetails;

  cardNumber;
  cardExpiry;
  cardCvc;

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
  
    const elements = this.paymentService.getStripe().elements();

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
        if (input.value !== null || input.value.length === 0) {
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

    this.disableInputs();
    this.disableSubmitButton();

    this.billingDetails = this.paymentService.prepareBillingDetails(this.name, this.email, this.address1, this.city, this.state, this.zip);
    const paymentMethod = await this.paymentService.createPaymentMethod(this.cardNumber, this.billingDetails);
    if (paymentMethod) {
      this.paymentMethod = paymentMethod;
      const paymentMethodExists = await this.paymentService.checkForPaymentMethod(this.userId, this.paymentMethod.card);
      if (paymentMethodExists) {
        this.waitingLoadingSpinner();
        this.hideAuthorisationPopup();
        this.showPaymentMethodExists();
      } else {
        this.waitingLoadingSpinner();
        this.hideAuthorisationPopup();
        this.showConfirmationPopup();
      }
    }
  }

  onCancelAuthorisedCardClick(e) {
    e.preventDefault();
    this.hideAuthorisationPopup();
    this.hideConfirmationPopup(this.FormAction.DECLINE_AUTH);
  }

  onBackExistsCardClick(e) {
    e.preventDefault();
    this.hideAuthorisationPopup();
    this.hidePaymentMethodExists();
  }

  async onAuthorisedCardClick(e) {
    e.preventDefault();
    this.validateFormBySubmit();
    this.hideConfirmationPopup(this.FormAction.CONIRM_AUTH);

    if (this.paymentMethod) {
      this.logger.debug('Successfully created paymentMethod object', this.paymentMethod);
      const addPaymentMethod = await this.paymentService.addPaymentMethod(this.userId, this.paymentMethod);
      if (addPaymentMethod) {
        this.logger.debug('Successfully added new payment method to firebase', addPaymentMethod);
        const clientSecret = await this.paymentService.getSetupIntentClientSecret(this.userId);
        if (clientSecret) {
          this.logger.debug('Successfully obtained client secret from firebase');
          this.logger.debug('Checking setupIntent status');
          this.paymentService.getStripe().retrieveSetupIntent(clientSecret).then((result) => {
            if (result.setupIntent.status === 'succeeded') {
              this.logger.debug('Successfully confirmed card setup', result.setupIntent);
              this.completeLoadingSpinner();
              this.setTitle('Confirmed new payment method!');
              //setTimeout(() => { this.router.navigate(['dashboard']); }, 10000);
            } else {
              this.logger.error('There was an error confirming card setup', result.error);
              this.showPaymentForm();
            }
          });
        } else {
          this.logger.error('There was an error obtaining clientSecret!');
          this.showPaymentForm();
        }
      } else {
        this.logger.error('Could not add paymentMethod to Firebase', addPaymentMethod);
        this.showPaymentForm();
      }
    } else {
      this.showPaymentForm();
    }
  }

  validateFormBySubmit() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit event.
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    this.form.nativeElement.appendChild(submit);
    submit.click();
    submit.remove();
  }
  setTitle(title) {
    this.title.nativeElement.innerHTML = title;
  }

  waitingLoadingSpinner() {
    this.checkout.nativeElement.classList.add('submitting');
  }
  completeLoadingSpinner() {
    this.checkout.nativeElement.classList.add('submitted');
  }
  removeLoadingSpinner() {
    this.checkout.nativeElement.classList.remove('submitted');
    this.checkout.nativeElement.classList.remove('submitting');
  }

  hidePaymentMethodExists() {
    this.exists.nativeElement.setAttribute('style', 'opacity: 0');
    setTimeout(() => {
      this.showPaymentForm();
      this.authorise.nativeElement.setAttribute('style', 'display: block');
    }, 350);
  }
  hideAuthorisationPopup() {
    this.success.nativeElement.setAttribute('style', 'display: none');
  }
  hideConfirmationPopup(action) {
    this.authorise.nativeElement.setAttribute('style', 'opacity: 0');
    setTimeout(() => {
      if (action === this.FormAction.DECLINE_AUTH) {
        this.showPaymentForm();
      } else if (action === this.FormAction.CONIRM_AUTH) {
        this.waitingLoadingSpinner();
        this.showAuthorisationPopup();
      }
    }, 350);
  }

  showPaymentMethodExists() {
    this.setTitle('Payment method exists');
    this.authorise.nativeElement.setAttribute('style', 'display: none');
    this.exists.nativeElement.setAttribute('style', 'opacity: 1; transform: translateY(25px)');
  }
  showAuthorisationPopup() {
    this.setTitle('Adding payment method...');
    this.success.nativeElement.setAttribute('style', 'display: block');
  }
  showConfirmationPopup() {
    this.setTitle('Confirm new payment method');
    this.authorise.nativeElement.setAttribute('style', 'opacity: 1; transform: translateY(25px)');
  }
  showPaymentForm() {
    this.setTitle('Add a payment method');
    this.removeLoadingSpinner();
    this.enableInputs();
    this.enableSubmitButton();
  }
}


