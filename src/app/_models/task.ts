export interface Task {
  uid?: string;
  name: string;
  description: string;
  product: string;
  category: string;
  completionDate: string;
  currency: string;
  carePlanPrice: number;
  basketTotal: number;
  basketTotalAdjustments: number;
}
