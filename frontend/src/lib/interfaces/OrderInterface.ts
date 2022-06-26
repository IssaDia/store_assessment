import { ProductInterface } from "./ProductInterface";
import {Status} from "../enums/Order"

export interface OrderInterface {
  _id : string,
  date: Date;
  orderItems: ProductInterface[];
  status: string;
};