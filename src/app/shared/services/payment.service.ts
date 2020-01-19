import { Injectable, ElementRef } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from './firebase.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import StripeType from 'stripe';
import { environment } from 'src/environments/environment';

declare const Stripe: any;

@Injectable()
export class PaymentService {

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private logger: NGXLogger) {
  }

  stripe  = Stripe(environment.stripeKey);

  async addPaymentMethod(id: string, paymentMethod: StripeType.PaymentMethod) {
    // const id = await this.authService.getUser().id;
    const data = {
      paymentMethod: paymentMethod.id,
      billingDetails: paymentMethod.billing_details,
      card: paymentMethod.card,
      type: paymentMethod.type,
      created: paymentMethod.created
    };
    const paymentMethodsCollection = `users/${id}/paymentMethods`;
    const paymentMethodId = this.firebaseService.createId();
    await this.firebaseService.createDocumentWithData(paymentMethodsCollection, paymentMethodId, data, true);
    return await this.firebaseService.getDataInDocument(paymentMethodsCollection, paymentMethodId);
  }

  async getSetupIntentClientSecret(id: string) {
    // const user = await this.authService.getUser();
    // const data = await this.firebaseService.getDataInDocument('users', user.uid);
    const data = await this.firebaseService.getDataInDocument('users', id);
    this.logger.info('Retrieved clientSecret from user:', id);
    return data.stripe.setupIntent.client_secret;
  }

  async submitStripeCharge(source: StripeType.Source, amount: number, currency: string) {
    // const user = await this.authService.getUser();
    const user = { uid: 1 }; // TODO: Replace this when login is working
    const amountAsHundrethOfCurrency = amount * 100; // Stripe charges in 1/100 of normal unit i.e. in pence or cent
    const chargeData = {
      source: source.id,
      amount: amountAsHundrethOfCurrency,
      currency: currency
    };
    const id = this.firebaseService.createId();
    this.firebaseService.createDocumentWithData(`users/${user.uid}/payments`, id, chargeData, true);
    return id;
  }

  prepareBillingDetails(name: string, email: string, address1: ElementRef, city: ElementRef, state: ElementRef, zip: ElementRef) {
    return {
      name: name ? name : undefined,
      email: email ? email : undefined,
      address: {
        line1: address1 ? address1.nativeElement.value : undefined,
        city: city ? city.nativeElement.value : undefined,
        state: state ? state.nativeElement.value : undefined,
        postal_code: zip ? zip.nativeElement.value : undefined,
      }
    };
  }

  async checkForPaymentMethod(userId, card) {
    const paymentMethodCollection = `users/${userId}/paymentMethods`;
    return await this.firebaseService.checkPaymentMethodsInCollectionExists(paymentMethodCollection, card);
  }

  getStripe() {
    return this.stripe;
  }

  async createPaymentMethod(cardNumber, billingDetails) {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: billingDetails
    });
    if (paymentMethod) {
        this.logger.debug('Successfully created paymentMethod object', paymentMethod);
        return paymentMethod;
    } else {
      this.logger.error('Could not create a paymentMethod object', error);
    }
  }
}
