import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from './firebase.service';

@Injectable()
export class PaymentService {

  constructor(
    // private authService: AuthService,
    private firebaseService: FirebaseService,
    private logger: NGXLogger) {
  }

  async submitStripeCharge(source, amount, currency) {
    //const user = await this.authService.getUser();
    const user = { uid: 1 }; // TODO: Replace this when login is working
    const amountAsHundrethOfCurrency = amount * 100; // Stripe charges in 1/100 of normal unit i.e. in pence or cent
    const chargeData = {
      source: source.id,
      amount: amountAsHundrethOfCurrency,
      currency: currency
    };
    const newChargeRef = this.firebaseService.createDocumentRef(`users/${user.uid}/payments`);
    this.logger.debug(`Creating new stripe payment with generated id at: '/${newChargeRef.ref.path}'`);
    this.logger.debug(chargeData);
    newChargeRef.set(chargeData);
    return newChargeRef.ref.id;
  }
}
