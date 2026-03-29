import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistCardComponent } from '../../components/wishlist-card/wishlist-card.component';
import { CartsService } from '../../services/carts/carts.service.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../core/auth/services/auth.service.js';
import { ToastrService } from 'ngx-toastr';
import { WishlistsService } from '../../services/wishlists/wishlists.service.js';
import { Iproduct } from '../../models/product/Iproduct.js';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response.js';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [RouterLink, WishlistCardComponent, EmptyCartComponent],
})
export class WishlistComponent implements OnInit {
  wishlists: WritableSignal<Iproduct[] | null> = signal(null);
  wishlistsCount: WritableSignal<number> = signal(0);
  constructor(
    private wishlistService: WishlistsService,
    private ngxSpinner: NgxSpinnerService,
    private authService: AuthService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    if (!this.isUserLogged) {
      this.toaster.warning('Please sign in first', 'Warning', {
        timeOut: 2000,
      });
      this.wishlists.set([]);
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
    this.wishlistService.getLoggedUserWishlists().subscribe({
      next: (res: IwishlistResponse) => {
        this.ngxSpinner.hide();
        this.wishlists.set(res.data);
        this.wishlistsCount.set(res.count);
        console.log(res.data);
      },
      error: (err) => {
        this.ngxSpinner.hide();
        this.wishlists.set([]);
        console.log(err);
      },
    });
  }

  handleChange() {
    this.getUserWishlists();
  }
}
