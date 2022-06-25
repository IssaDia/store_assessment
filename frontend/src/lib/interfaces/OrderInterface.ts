import { ProductInterface } from "./ProductInterface";

export interface OrderInterface {
  id: string;
  date: Date;
  orderItems: ProductInterface[];
  status: string;
};