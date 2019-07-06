export interface Task {
  name: string;
  description: string;
  product: string;
  category: string;
  completionDate: string;
  currency: string;
  carePlanPrice: number;
  price: number;
  createdAt: Date;
  createdBy?: string;
}
