import { ItemInterface } from "./ItemInterface";
import {Status} from "../enums/Order"

export interface OrderInterface {
  _id : string,
  date: Date;
  orderItems: ItemInterface[];
  status: string;
  total : Number
};