import { ToastrService } from 'ngx-toastr';
import { CartsService } from './../../services/carts/carts.service';
import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Iproduct } from '../../models/product/Iproduct.js';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductDiscountPipe } from '../../pipes/product/productDiscount.pipe.js';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response.js';
import { AuthService } from '../../../core/auth/services/auth.service.js';
import { WishlistsService } from '../../services/wishlists/wishlists.service.js';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response.js';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [RouterLink, CurrencyPipe, ProductDiscountPipe],
})
export class ProductCardComponent implements OnInit, OnChanges {
  product: InputSignal<Iproduct> = input.required();
  productAvgRate: WritableSignal<number> = signal(0);
  starsArr: WritableSignal<string[]> = signal([]);
  isAvgRateFloat: WritableSignal<boolean> = signal(false);
  isloading: WritableSignal<boolean> = signal(false);
  isloading_: WritableSignal<boolean> = signal(false);
  isFav: InputSignal<boolean> = input.required();
  changedToFav = output<IdeleteWishlistResponse>();

  constructor(
    private cartsService: CartsService,
    private wishlistService: WishlistsService,
    private toaster: ToastrService,
    private authService: AuthService,
  ) {}

  ngOnInit() {}
  ngOnChanges(): void {
    this.productAvgRate.set(Math.floor(this.product().ratingsAverage));
    if (this.productAvgRate() === Math.round(this.product().ratingsAverage)) {
      this.isAvgRateFloat.set(false);
    } else {
      this.isAvgRateFloat.set(true);
    }
    this.stars();
  }
  stars() {
    const arr: string[] = [];

    for (let i = 0; i < this.productAvgRate(); i++) {
      arr.push('fa-solid fa-star');
    }

    if (this.isAvgRateFloat()) {
      arr.push('fa-solid fa-star-half-stroke');
    }

    for (let i = 0; i < 5 - Math.round(this.product().ratingsAverage); i++) {
      arr.push('fa-regular fa-star');
    }

    this.starsArr.set(arr);
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
    this.isloading_.set(true);
    this.cartsService.addProductToUserCart(id).subscribe({
      next: (res: { status: string; message: string }) => {
        this.isloading_.set(false);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.isloading_.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
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
    this.isloading.set(true);
    this.wishlistService.addProductToUserWishlist(id).subscribe({
      next: (res: IdeleteWishlistResponse) => {
        this.isloading.set(false);
        this.changedToFav.emit(res);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.isloading.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
        }
      },
    });
  }
  removeProductToUserWishlist(id: string) {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      return;
    }
    this.isloading.set(true);
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res: IdeleteWishlistResponse) => {
        this.isloading.set(false);
        this.changedToFav.emit(res);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.isloading.set(false);

        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
        }
      },
    });
  }
}
