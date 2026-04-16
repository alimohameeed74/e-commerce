import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, DoCheck, OnInit, signal, WritableSignal, Pipe } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CartsService } from '../../services/carts/carts.service.js';
import { UserCartProducts } from '../../models/user-cart-products/user-cart-products.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response.js';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';
import { SpinnerService } from '../../../core/services/spinner/spinner.service.js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    RouterLink,
    ProductCartComponent,
    EmptyCartComponent,
    CurrencyPipe,
    InternetConnectionComponent,
  ],
})
export class CartComponent implements OnInit {
  carts: WritableSignal<UserCartProducts[]> = signal([]);
  cartsCount: WritableSignal<number> = signal(0);
  cartId: WritableSignal<string> = signal('');
  totalPrice: WritableSignal<number> = signal(0);
  totalItems: WritableSignal<number> = signal(0);
  offline: WritableSignal<boolean> = signal(false);
  emptyCart: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  clearAllItemsLoader: WritableSignal<boolean> = signal(false);
  constructor(
    private cartsService: CartsService,
    private ngxSpinner: NgxSpinnerService,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      this.carts.set([]);
      this.emptyCart.set(true);

      return;
    } else {
      this.getUserCarts();
    }
  }

  get isUserLogged() {
    return this.authService.getIsLoggedIn_;
  }

  getUserCarts() {
    this.ngxSpinner.show();
    this.isLoading.set(true);
    this.cartsService.getLoggedUserCarts().subscribe({
      next: (res: IcartApiResponse) => {
        this.isLoading.set(false);
        this.ngxSpinner.hide();
        this.carts.set(res.data.products);
        this.cartsCount.set(res.numOfCartItems);
        this.totalPrice.set(res.data.totalCartPrice);
        this.cartId.set(res.cartId);
        if (res.numOfCartItems === 0) {
          this.emptyCart.set(true);
        } else {
          res.data.products.forEach((product) => {
            this.totalItems.update((p) => p + product.count);
          });
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.ngxSpinner.hide();
        this.spinnerService.resetSpinnerText();
        if (!navigator.onLine) {
          this.offline.set(true);
        } else if (err?.status === 401) {
          this.toaster.error('Please login again', err?.statusMsg);
        } else {
          this.toaster.error('Please try again', err.statusMsg);
        }
        this.carts.set([]);
        this.emptyCart.set(true);
      },
    });
  }

  clearUserCarts() {
    this.clearAllItemsLoader.set(true);
    this.cartsService.clearUserCarts().subscribe({
      next: (res: IcartApiResponse) => {
        this.ngxSpinner.hide();
        this.clearAllItemsLoader.set(false);
        this.carts.set([]);
        this.cartsCount.set(0);
        this.totalPrice.set(0);
        this.totalItems.set(0);
      },
      error: (err) => {
        this.clearAllItemsLoader.set(false);

        this.carts.set([]);
        this.cartsCount.set(0);
        this.totalPrice.set(0);
        this.totalItems.set(0);
        if (!navigator.onLine) {
          this.toaster.error('check your connection', err.statusMsg || 'fail');
        } else {
          this.toaster.error(err.message, err.statusMsg);
        }
      },
    });
  }

  handleChange(event: IcartApiResponse) {
    this.totalItems.set(0);
    this.carts.set(event.data.products);
    this.cartsCount.set(event.numOfCartItems);
    this.totalPrice.set(event.data.totalCartPrice);
    event.data.products.forEach((product) => {
      this.totalItems.update((p) => p + product.count);
    });
  }

  goToCheckout() {
    this.router.navigate([`/checkout/${this.cartId()}`]);
  }
}
