import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { SharedTitleComponent } from '../../../shared/components/shared-title/shared-title.component';
import { Iproduct } from '../../models/product/Iproduct.js';
import { ProductsService } from '../../services/products/products.service.js';
import { WishlistsService } from '../../services/wishlists/wishlists.service.js';
import { AuthService } from '../../../core/auth/services/auth.service.js';
import { ToastrService } from 'ngx-toastr';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response.js';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response.js';
import { InternetConnectionComponent } from '../internet-connection/internet-connection.component';
import { EmptyItemsComponent } from '../empty-items/empty-items.component';
import { ContentLoaderComponent } from '../../../core/layouts/components/content-loader/content-loader.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-may-like',
  templateUrl: './products-may-like.component.html',
  styleUrls: ['./products-may-like.component.css'],
  imports: [
    SharedTitleComponent,
    EmptyItemsComponent,
    ContentLoaderComponent,
    ProductCardComponent,
  ],
})
export class ProductsMayLikeComponent implements OnInit, OnChanges {
  catId: InputSignal<string> = input.required();
  productId: InputSignal<string> = input.required();
  products: WritableSignal<Iproduct[]> = signal([]);
  wishlistIds: WritableSignal<string[]> = signal([]);
  emptyProducts: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistsService,
    private authService: AuthService,
    private toasterService: ToastrService,
  ) {}

  ngOnInit() {
    this.getUserWishlists();
  }

  ngOnChanges(): void {
    if (this.catId()) {
      this.getAllProductsByCat(this.catId());
    }
  }
  getAllProductsByCat(catId: string) {
    this.isLoading.set(true);
    this.productsService.getProductsBy('category', catId).subscribe({
      next: (data: Iproduct[]) => {
        this.isLoading.set(false);
        this.products.set(data.filter((product) => product._id !== this.productId()));
        if (data.length === 0) {
          this.emptyProducts.set(true);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        if (
          err?.status === 404 ||
          err?.status === 400 ||
          err?.status === 500 ||
          !navigator.onLine
        ) {
          this.products.set([]);
          this.emptyProducts.set(true);
        }
      },
    });
  }

  get isUserLogin() {
    return this.authService.getIsLoggedIn_;
  }

  getUserWishlists() {
    if (!this.isUserLogin) return;
    this.wishlistService.getLoggedUserWishlists().subscribe({
      next: (res: IwishlistResponse) => {
        this.wishlistIds.set(res.data.map((elem) => elem._id));
      },
      error: (err) => {
        this.toasterService.error(err.message, err.status);
      },
    });
  }
  handelChange(event: IdeleteWishlistResponse) {
    this.wishlistIds.set(event.data.map((elem) => elem));
  }
}
