import { LotInterface } from "./LotInterface";

export interface ItemInterface {
  code: number;
  name: string;
  quantity: number;
  lots: LotInterface[];
  totalLots: number
}
