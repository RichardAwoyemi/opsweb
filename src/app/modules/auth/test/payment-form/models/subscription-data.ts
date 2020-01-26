import { PlanType, Region } from 'src/app/shared/services/payment.service';

export class SubscriptionData {
  customer: string;
  plan: string;
  planType: PlanType;
  region: Region;
  paymentMethodId: string;
}
