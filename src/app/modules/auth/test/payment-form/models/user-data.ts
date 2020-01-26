import { DefaultPaymentMethodData } from './default-payment-method-data';
import { StripeData } from './stripe-data';

export class UserData {
  id?: string;
  defaultPaymentMethod?: DefaultPaymentMethodData;
  stripe?: StripeData;
  planId?: string;
}
