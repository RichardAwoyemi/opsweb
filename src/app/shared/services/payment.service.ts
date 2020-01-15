import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from './firebase.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private logger: NGXLogger) {
  }

  async addPaymentMethod(id: string, paymentMethod: Stripe.PaymentMethod) {
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

  async submitStripeCharge(source: Stripe.Source, amount: number, currency: string) {
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
}
