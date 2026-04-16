import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistCardComponent } from '../../components/wishlist-card/wishlist-card.component';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from '../../services/wishlists/wishlists.service';
import { Iproduct } from '../../models/product/Iproduct';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { SpinnerService } from '../../../core/services/spinner/spinner.service.js';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [RouterLink, WishlistCardComponent, EmptyCartComponent, InternetConnectionComponent],
})
export class WishlistComponent implements OnInit {
  wishlists: WritableSignal<Iproduct[] | null> = signal(null);
  wishlistsCount: WritableSignal<number> = signal(0);
  offline: WritableSignal<boolean> = signal(false);
  emptyCart: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private wishlistService: WishlistsService,
    private ngxSpinner: NgxSpinnerService,
    private authService: AuthService,
    private toaster: ToastrService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      this.wishlists.set([]);
      this.emptyCart.set(true);

      return;
    } else {
      this.getUserWishlists();
    }
  }

  get isUserLogged() {
    return this.authService.getIsLoggedIn_;
  }

  getUserWishlists() {
    this.ngxSpinner.show();
    this.isLoading.set(true);
    this.wishlistService.getLoggedUserWishlists().subscribe({
      next: (res: IwishlistResponse) => {
        this.isLoading.set(false);
        this.ngxSpinner.hide();
        this.wishlists.set(res.data);
        this.wishlistsCount.set(res.count);
        if (res.count === 0) {
          this.emptyCart.set(true);
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
        }
        this.wishlists.set([]);
        this.emptyCart.set(true);
      },
    });
  }

  handleChange() {
    this.getUserWishlists();
  }
}
