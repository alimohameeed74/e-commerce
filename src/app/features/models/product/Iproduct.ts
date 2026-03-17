import { Ibrand } from '../brand/Ibrand';
import { Icategory } from '../category/Icategory';
import { Ireview } from '../review/Ireview.js';
import { IsubCategory } from '../subcategory/Isub-category';

export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: IsubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Icategory;
  brand: Ibrand;
  ratingsAverage: number;
  createdAt?: string;
  updatedAt?: string;
  id: string;
  reviews?: Ireview[];
}
