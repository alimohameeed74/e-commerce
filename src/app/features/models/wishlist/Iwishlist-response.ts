import { Iproduct } from '../product/Iproduct.js';

export interface IwishlistResponse {
  status: string;
  count: number;
  data: Iproduct[];
}
