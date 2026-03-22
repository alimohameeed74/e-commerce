import { Toast, ToastrService } from 'ngx-toastr';
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
  constructor(
    private cartsService: CartsService,
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
    for (let i = 0; i < this.productAvgRate(); i++) {
      this.starsArr().push('fa-solid fa-star');
    }
    if (this.isAvgRateFloat()) {
      this.starsArr().push('fa-solid fa-star-half-stroke');
    }
    for (let i = 0; i < 5 - Math.round(this.product().ratingsAverage); i++) {
      this.starsArr().push('fa-regular fa-star');
    }
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
      next: (res: IcartApiResponse) => {
        this.isloading.set(false);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.toaster.error(err.message, err.status);
      },
    });
  }
}
