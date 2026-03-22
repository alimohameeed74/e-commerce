import { UserCartProductDetails } from './../user-cart-product-details/user-cart-product-details';
export interface UserCartProducts {
  count: number;
  _id: string;
  product: UserCartProductDetails;
  price: number;
}
