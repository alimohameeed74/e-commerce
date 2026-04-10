import { WishlistsService } from './../../services/wishlists/wishlists.service';
import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Iproduct } from '../../models/product/Iproduct';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartsService } from '../../services/carts/carts.service';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.css'],
  imports: [RouterLink],
})
export class WishlistCardComponent implements OnInit {
  card: InputSignal<Iproduct> = input.required();
  isLoading: WritableSignal<boolean> = signal(false);
  isLoading_: WritableSignal<boolean> = signal(false);
  isDeletedFromWishlist = output<IdeleteWishlistResponse>();
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private cartsService: CartsService,
    private wishlistsService: WishlistsService,
  ) {}

  ngOnInit() {}
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
    this.isLoading_.set(true);
    this.cartsService.addProductToUserCart(id).subscribe({
      next: (res: { status: string; message: string }) => {
        this.isLoading_.set(false);
        this.toaster.success(res.message, res.status, {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.toaster.error(err.message, err.status);
      },
    });
  }

  removeProductFromWishlist(id: string) {
    this.isLoading.set(true);
    this.wishlistsService.removeProductFromWishlist(id).subscribe({
      next: (res: IdeleteWishlistResponse) => {
        this.isLoading.set(false);
        this.isDeletedFromWishlist.emit(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
      },
    });
  }
}
