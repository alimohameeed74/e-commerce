import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from './../../services/products/products.service';
import { AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Iproduct } from '../../models/product/Iproduct.js';
import { IapiResponseSingleData } from '../../models/api-response-single-data/Iapi-response-single-data.js';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductDiscountPipe } from '../../pipes/product/productDiscount.pipe.js';
import { ProductDetailsTabComponent } from '../../components/product-details-tab/product-details-tab.component';
import { ProductReturnsTabComponent } from '../../components/product-returns-tab/product-returns-tab.component';
import { ProductReviewsTabComponent } from '../../components/product-reviews-tab/product-reviews-tab.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { AuthService } from '../../../core/auth/services/auth.service.js';
import { ToastrService } from 'ngx-toastr';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response.js';
import { CartsService } from '../../services/carts/carts.service.js';
import { WishlistsService } from '../../services/wishlists/wishlists.service.js';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response.js';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response.js';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';
import { EmptyItemsComponent } from '../../components/empty-items/empty-items.component';
import { ProductsMayLikeComponent } from '../../components/products-may-like/products-may-like.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    RouterLink,
    CurrencyPipe,
    ProductDiscountPipe,
    ProductDetailsTabComponent,
    ProductReturnsTabComponent,
    ProductReviewsTabComponent,
    InternetConnectionComponent,
    EmptyItemsComponent,
    ProductsMayLikeComponent,
  ],
})
export class ProductDetailsComponent implements OnInit {
  product: WritableSignal<Iproduct | null> = signal(null);
  productAvgRate: WritableSignal<number> = signal(0);
  starsArr: WritableSignal<string[]> = signal([]);
  isAvgRateFloat: WritableSignal<boolean> = signal(false);
  productDetailsTab: WritableSignal<boolean> = signal(true);
  productReviewsTab: WritableSignal<boolean> = signal(false);
  productReturnsTab: WritableSignal<boolean> = signal(false);
  isloading: WritableSignal<boolean> = signal(false);
  isloading_: WritableSignal<boolean> = signal(false);
  wishlistIds: WritableSignal<string[]> = signal([]);
  isFav: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  emptyProduct: WritableSignal<boolean> = signal(false);
  catId: WritableSignal<string> = signal('');
  likesisloading: WritableSignal<boolean> = signal(false);

  constructor(
    private productsService: ProductsService,
    private nxSpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toaster: ToastrService,
    private cartsService: CartsService,
    private wishlistService: WishlistsService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.showProductDetailsTab();
        this.getProductDetails(id);
        this.getUserWishlists(id);
      }
    });
  }
  getProductDetails(id: string) {
    this.nxSpinnerService.show();
    this.likesisloading.set(true);
    this.productsService.getSpecificProduct(id).subscribe({
      next: (data: Iproduct) => {
        this.nxSpinnerService.hide();
        this.likesisloading.set(false);
        this.product.set(data);
        this.catId.set(this.product()!.category._id);
        this.productAvgRate.set(Math.floor(this.product()!.ratingsAverage));
        if (this.productAvgRate() === Math.round(this.product()!.ratingsAverage)) {
          this.isAvgRateFloat.set(false);
        } else {
          this.isAvgRateFloat.set(true);
        }
        this.stars();
      },
      error: (err) => {
        this.nxSpinnerService.hide();
        this.likesisloading.set(false);

        if (!navigator.onLine) {
          this.offline.set(true);
        } else {
          this.product.set(null);
          this.emptyProduct.set(true);
        }
      },
    });
  }

  stars() {
    this.starsArr.set([]);
    for (let i = 0; i < this.productAvgRate(); i++) {
      this.starsArr().push('fa-solid fa-star');
    }
    if (this.isAvgRateFloat()) {
      this.starsArr().push('fa-solid fa-star-half-stroke');
    }
    for (let i = 0; i < 5 - Math.round(this.product()!.ratingsAverage); i++) {
      this.starsArr().push('fa-regular fa-star');
    }
  }

  showProductDetailsTab() {
    this.productDetailsTab.set(true);
    this.productReviewsTab.set(false);
    this.productReturnsTab.set(false);
  }
  showProductReviewsTab() {
    this.productDetailsTab.set(false);
    this.productReviewsTab.set(true);
    this.productReturnsTab.set(false);
  }
  showProductReturnsTab() {
    this.productDetailsTab.set(false);
    this.productReviewsTab.set(false);
    this.productReturnsTab.set(true);
  }

  get isUserLogged() {
    return this.authService.getIsLoggedIn_;
  }

  addProductToUserCart(id: string) {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      return;
    }
    this.isloading.set(true);
    this.cartsService.addProductToUserCart(id).subscribe({
      next: (res: { status: string; message: string }) => {
        this.isloading.set(false);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.isloading.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.status || 'fail');
        } else {
          this.toaster.error(err.message, err.status);
        }
      },
    });
  }

  addProductToUserWishlist(id: string) {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      return;
    }
    this.isloading_.set(true);
    this.wishlistService.addProductToUserWishlist(id).subscribe({
      next: (res: IdeleteWishlistResponse) => {
        this.isloading_.set(false);
        this.wishlistIds.set(res.data);
        this.isFav.set(this.wishlistIds().includes(id));
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.isloading_.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.status || 'fail');
        } else {
          this.toaster.error(err.message, err.status);
        }
      },
    });
  }

  getUserWishlists(id: string) {
    if (!this.isUserLogged) return;
    this.wishlistService.getLoggedUserWishlists().subscribe({
      next: (res: IwishlistResponse) => {
        this.wishlistIds.set(res.data.map((elem) => elem._id));
        this.isFav.set(this.wishlistIds().includes(id));
      },
      error: (err) => {
        this.toaster.error(err.message, err.status);
      },
    });
  }

  removeProductFromWishlist(id: string) {
    this.isloading_.set(true);
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res: IdeleteWishlistResponse) => {
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
        this.wishlistIds.set(res.data);
        this.isFav.set(this.wishlistIds().includes(id));
        this.isloading_.set(false);
      },
      error: (err) => {
        this.isloading_.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.status || 'fail');
        } else {
          this.toaster.error(err.message, err.status);
        }
      },
    });
  }
}
