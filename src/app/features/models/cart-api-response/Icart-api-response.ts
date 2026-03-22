import { UserCarts } from '../user-carts/user-carts.js';

export interface IcartApiResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: UserCarts;
}
