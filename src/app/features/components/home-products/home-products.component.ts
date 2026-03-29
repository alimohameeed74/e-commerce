import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharedTitleComponent } from '../../../shared/components/shared-title/shared-title.component';
import { Iproduct } from '../../models/product/Iproduct.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { ContentLoaderComponent } from '../../../core/layouts/components/content-loader/content-loader.component';
import { WishlistsService } from '../../services/wishlists/wishlists.service.js';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response.js';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response.js';
import { AuthService } from '../../../core/auth/services/auth.service.js';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
  imports: [ProductCardComponent, SharedTitleComponent, ContentLoaderComponent],
})
export class HomeProductsComponent implements OnInit {
  products: WritableSignal<Iproduct[]> = signal([]);
  wishlistIds: WritableSignal<string[]> = signal([]);
  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getUserWishlists();
  }
  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res: IapiResponse<Iproduct[]>) => {
        this.products.set(res.data);
      },
      error: (err) => {
        console.log(err);
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
        console.log(err);
      },
    });
  }
  handelChange(event: IdeleteWishlistResponse) {
    this.wishlistIds.set(event.data.map((elem) => elem));
  }
}
