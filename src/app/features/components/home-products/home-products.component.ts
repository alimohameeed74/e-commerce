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
import { EmptyItemsComponent } from '../empty-items/empty-items.component';
import { InternetConnectionComponent } from '../internet-connection/internet-connection.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
  imports: [
    ProductCardComponent,
    SharedTitleComponent,
    ContentLoaderComponent,
    EmptyItemsComponent,
    InternetConnectionComponent,
  ],
})
export class HomeProductsComponent implements OnInit {
  products: WritableSignal<Iproduct[]> = signal([]);
  wishlistIds: WritableSignal<string[]> = signal([]);
  emptyProducts: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private productsService: ProductsService,
    private wishlistService: WishlistsService,
    private authService: AuthService,
    private toasterService: ToastrService,
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getUserWishlists();
  }
  getAllProducts() {
    this.isLoading.set(true);
    this.productsService.getAllProducts().subscribe({
      next: (data: Iproduct[]) => {
        this.isLoading.set(false);
        this.products.set(data);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.products.set([]);
          this.emptyProducts.set(true);
        } else if (!navigator.onLine) {
          this.offline.set(true);
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
