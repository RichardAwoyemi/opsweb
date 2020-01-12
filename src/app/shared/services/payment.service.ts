import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from './firebase.service';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class PaymentService {

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private logger: NGXLogger) {
  }

  addNewUserPaymentMethods(id, setupIntent) {
    // const id = await this.authService.getUser().id;
    console.log(setupIntent);
    const data = {
      paymentMethod: setupIntent.payment_method,
      paymentMethodTypes: setupIntent.payment_method_types,
      created: setupIntent.created,
      status: setupIntent.status,
    };
    const paymentMethodsCollection = `users/${id}/paymentMethods`;
    const paymentMethodId = this.firebaseService.createId();
    this.firebaseService.createDocumentWithData(paymentMethodsCollection, paymentMethodId, data);
  }

  async getSetupIntentClientSecret(id) {
    // const user = await this.authService.getUser();
    // const data = await this.firebaseService.getDataInDocument('users', user.uid);
    const data = await this.firebaseService.getDataInDocument('users', id);
    this.logger.info('Retrieved clientSecret from user:', id);
    return data.stripe.setupIntent.client_secret;
  }

  async submitStripeCharge(source, amount, currency) {
    // const user = await this.authService.getUser();
    const user = { uid: 1 }; // TODO: Replace this when login is working
    const amountAsHundrethOfCurrency = amount * 100; // Stripe charges in 1/100 of normal unit i.e. in pence or cent
    const chargeData = {
      source: source.id,
      amount: amountAsHundrethOfCurrency,
      currency: currency
    };
    const id = this.firebaseService.createId();
    this.firebaseService.createDocumentWithData(`users/${user.uid}/payments`, id, chargeData);
    return id;
  }

  async submitCardDetails(source, amount, currency) {
    // const user = await this.authService.getUser();
    const user = { uid: 1 }; // TODO: Replace this when login is working
    const cardData = {
      source: source.id,
      currency: currency
    };
    const id = this.firebaseService.createId();
    this.firebaseService.createDocumentWithData(`users/${user.uid}/paymentMethods`, id, cardData);
    return id;
  }
}
