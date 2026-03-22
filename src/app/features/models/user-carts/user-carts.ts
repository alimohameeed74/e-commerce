import { UserCartProducts } from '../user-cart-products/user-cart-products.js';

export interface UserCarts {
  _id: string;
  cartOwner?: string;
  products: UserCartProducts[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}
