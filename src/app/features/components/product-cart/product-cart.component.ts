import { CartsService } from './../../services/carts/carts.service';
import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { UserCartProducts } from '../../models/user-cart-products/user-cart-products.js';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
  imports: [RouterLink, CurrencyPipe],
})
export class ProductCartComponent implements OnInit, OnChanges {
  product: InputSignal<UserCartProducts> = input.required();
  isLoading: WritableSignal<boolean> = signal(false);
  isLoading_: WritableSignal<boolean> = signal(false);
  isDeletedFromCart = output<IcartApiResponse>();
  increaseOrDecrease: WritableSignal<boolean> = signal(false);
  hideResetProductCount: WritableSignal<boolean> = signal(false);
  productCount: WritableSignal<number> = signal(0);
  constructor(
    private cartsService: CartsService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {}
  ngOnChanges(): void {
    this.productCount.set(this.product().count);
  }

  removeProductFromCart(id: string) {
    this.isLoading.set(true);
    this.cartsService.removeProductFromCart(id).subscribe({
      next: (res: IcartApiResponse) => {
        this.isLoading.set(false);
        this.isDeletedFromCart.emit(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
        }
      },
    });
  }
  updatedProductFromCart(id: string, count: number) {
    this.isLoading_.set(true);
    this.hideResetProductCount.set(true);
    this.cartsService.updateCartProductQuantity(id, count).subscribe({
      next: (res: IcartApiResponse) => {
        this.isLoading_.set(false);
        this.increaseOrDecrease.set(false);
        this.hideResetProductCount.set(false);
        this.isDeletedFromCart.emit(res);
      },
      error: (err) => {
        this.isLoading_.set(false);
        this.increaseOrDecrease.set(false);
        this.hideResetProductCount.set(false);

        this.product().count = this.productCount();
        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
        }
      },
    });
  }
  decrease() {
    this.increaseOrDecrease.set(true);
    this.product().count--;
    if (this.product().count <= 0) {
      this.product().count = 0;
    }
  }
  increase() {
    this.increaseOrDecrease.set(true);
    this.product().count++;
  }

  resetProductCount() {
    this.increaseOrDecrease.set(false);
    this.product().count = this.productCount();
  }
}
