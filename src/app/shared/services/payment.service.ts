import { Injectable, ElementRef } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from './firebase.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Stripe as StripeType } from 'stripe';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/modules/auth/test/payment-form/models/user-data';
import { DefaultPaymentMethodData } from 'src/app/modules/auth/test/payment-form/models/default-payment-method-data';
import { CountriesEUR } from 'src/app/modules/auth/test/payment-form/models/eur-countries';
import { CountryEnum } from 'src/app/modules/auth/test/payment-form/models/country-enum';
import { CountriesGBP } from 'src/app/modules/auth/test/payment-form/models/gbp-countries';
import { SubscriptionData } from 'src/app/modules/auth/test/payment-form/models/subscription-data';

declare const Stripe: any;

export enum PlanType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export enum Region {
  UK = 'UK',
  EU = 'EU',
  US = 'US'
}

@Injectable()
export class PaymentService {

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private logger: NGXLogger) {
  }

  stripe = Stripe(environment.stripeKey);

  getStripe() {
    return this.stripe;
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
    await this.firebaseService.createDocumentWithData(paymentMethodsCollection, paymentMethod.id, data, true);
    return await this.firebaseService.getDataInDocument(paymentMethodsCollection, paymentMethod.id);
  }

  async getSetupIntentClientSecret(id: string) {
    // const user = await this.authService.getUser();
    // const data = await this.firebaseService.getDataInDocument('users', user.uid);
    const data = await this.firebaseService.getDataInDocument('users', id);
    this.logger.info('Retrieved clientSecret from user:', id);
    return data.stripe.setupIntent.client_secret;
  }

  async checkForPaymentMethod(userId, card) {
    const paymentMethodCollection = `users/${userId}/paymentMethods`;
    return await this.firebaseService.checkPaymentMethodsInCollectionExists(paymentMethodCollection, card);
  }

  async createPaymentMethod(cardNumber, billingDetails) {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
      billing_details: billingDetails
    });
    if (paymentMethod) {
        this.logger.debug('Successfully created paymentMethod object');
        return paymentMethod;
    } else {
      this.logger.error('Could not create a paymentMethod object', error);
    }
  }

  async retrieveSetupIntent(clientSecret) {
    const { setupIntent, error } = await this.stripe.retrieveSetupIntent(clientSecret);
    if (setupIntent.status === 'succeeded') {
      this.logger.debug('Successfully confirmed card setup', setupIntent);
      return setupIntent;
    } else {
      this.logger.error('There was an error confirming card setup', error);
    }
  }

  /**
   * In The UI we need to show the user which cards they have setup and also provide the ability to set the
   * default payment method so that subscriptions can be taken from a card if there are multiple cards.
   *
   * Each payment method contains useful info like the card type, last 4 digits of the card, expiry year and
   * month and the issuing country for the card.
   */
  async getPaymentMethods(userId) {
    const paymentMethods = await this.firebaseService.getDocumentsInCollection(`users/${userId}/paymentMethods`);
    return paymentMethods;
  }

  async updateDefaultPaymentMethod(userId: string, paymentMethod: StripeType.PaymentMethod) {
    const defaultPaymentMethod: DefaultPaymentMethodData = {
      id: paymentMethod.id,
      country: paymentMethod.card.country
    };
    this.logger.debug(`Updating default payment method for user: '${userId}'`);
    await this.firebaseService.updateDocument('users', userId, { defaultPaymentMethod });
  }

  async getUserData(userId: string) {
    const userData: UserData = await this.firebaseService.getDataInDocument('users', userId);
    this.logger.info(`Obtained user data for user '${userId}':`, userData);
    return userData;
  }

  async cancelSubscription(userData: UserData) {
    const userId: string = userData.id;
    const planId: string = userData.planId;

     if (!planId) {
      this.logger.warn(`There is no existing subscription to cancel for user ${userId}`);
    } else {
      await this.firebaseService.deleteDocument(`/users/${userId}/subscriptions`, planId);
      await this.firebaseService.updateDocument('users', userId, { planId: FirebaseService.FieldDelete() });
    }
  }

  async addSubscription(userData: UserData, planType: PlanType) {
    const defaultPaymentMethod: DefaultPaymentMethodData = userData.defaultPaymentMethod;
    const customerId: string = userData.stripe.customer;
    const userId: string = userData.id;

    if (userData.planId) {
      this.logger.warn(`A subscription already exists for user ${userId}. Not adding new subscription`);
    } else {
      if (planType !== PlanType.YEARLY && planType !== PlanType.MONTHLY) {
        this.logger.error(`planType must be: ${PlanType.YEARLY} or ${PlanType.MONTHLY} `);
      } else {
        if (customerId) {
          const defaultPaymentMethodId = defaultPaymentMethod.id;
          if (defaultPaymentMethodId) {
            this.logger.debug(`Obtained defualt payment method for user: '${userId}'`);
            const region: Region = this.calculteRegion(defaultPaymentMethod);
            const planId: string = this.calculatePlanId(region, planType);
            const subscription: SubscriptionData = {
              customer: customerId,
              paymentMethodId: defaultPaymentMethodId,
              plan: planId,
              planType: planType,
              region: region
            };
            await this.firebaseService.createDocumentWithData(`/users/${userId}/subscriptions`, planId, subscription, false);
            await this.firebaseService.updateDocument('users', userId, { planId: planId });
          } else {
            this.logger.error(`No default payment method setup for user '${userId}'! Can not start subscription.`);
          }
        } else {
          this.logger.error(`No customer found for user '${userId}'! Can not start subscription.`);
        }
      }
    }
  }

  private calculteRegion(defaultPaymentMethod: DefaultPaymentMethodData): Region {
    const country = defaultPaymentMethod.country;
    const key = this.getEnumKeyByEnumValue(CountryEnum, country);

    let region: Region = Region.US;
    if (CountriesEUR.countries.includes(CountryEnum[key])) {
      region = Region.EU;
    } else if (CountriesGBP.countries.includes(CountryEnum[key])) {
      region = Region.UK;
    }

    this.logger.info(`Using payment '${region}' for payment method in country '${country}'`);
    return region;
  }


  private calculatePlanId(region: Region, planType: PlanType): string {
    this.logger.debug(`Using ${region} ${planType} subscription plan`);
    if (planType === PlanType.MONTHLY) {
      switch (region) {
        case Region.EU: return 'plan_GaJM5WdSghnANV';
        case Region.UK: return 'plan_GaJMpaDowEDbGa';
        case Region.US: return 'plan_GaJ46Tass3nE09';
      }
    } else if (planType === PlanType.YEARLY) {
      switch (region) {
        case Region.EU: return 'plan_Gc7FRtmsf7E7nm';
        case Region.UK: return 'plan_Gc7JUa8XHMu6aF';
        case Region.US: return 'plan_Gc7G2sC5YRpQBg';
      }
    }
    return null;
  }

  private getEnumKeyByEnumValue(countryEnum, enumValue: string) {
    const keys = Object.keys(countryEnum).filter(x => countryEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }
}


