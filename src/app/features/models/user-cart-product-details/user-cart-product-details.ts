import { Ibrand } from '../brand/Ibrand.js';
import { Icategory } from '../category/Icategory.js';
import { IsubCategory } from '../subcategory/Isub-category.js';

export interface UserCartProductDetails {
  subcategory: IsubCategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Icategory;
  brand: Ibrand;
  ratingsAverage: number;
  id: string;
}
