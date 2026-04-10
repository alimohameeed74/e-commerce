import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../features/services/products/products.service.js';
import { Iproduct } from '../../../features/models/product/Iproduct.js';
import { IapiResponse } from '../../../features/models/api-response/Iapi-response.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductCardComponent } from '../../../features/components/product-card/product-card.component';
import { AuthService } from '../../../core/auth/services/auth.service.js';
import { WishlistsService } from '../../../features/services/wishlists/wishlists.service.js';
import { IwishlistResponse } from '../../../features/models/wishlist/Iwishlist-response.js';
import { IdeleteWishlistResponse } from '../../../features/models/wishlist/Idelete-wishlist-response.js';
import { EmptyItemsComponent } from '../../../features/components/empty-items/empty-items.component';
import { InternetConnectionComponent } from '../../../features/components/internet-connection/internet-connection.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shared-data-filter',
  templateUrl: './shared-data-filter.component.html',
  styleUrls: ['./shared-data-filter.component.css'],
  imports: [ProductCardComponent, EmptyItemsComponent, InternetConnectionComponent],
})
export class SharedDataFilterComponent implements OnInit {
  data: WritableSignal<Iproduct[]> = signal([]);
  wishlistIds: WritableSignal<string[]> = signal([]);
  emptyData: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private router: Router,
    private producsSevice: ProductsService,
    private activatedRoute: ActivatedRoute,
    private ngxSpinner: NgxSpinnerService,
    private authAervice: AuthService,
    private wishlistService: WishlistsService,
    private toasterService: ToastrService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.emptyData.set(false);
      const category = param.get('category');
      const brand = param.get('brand');
      const subCategory = param.get('subcategory');
      if (category) {
        this.getData('category', category);
      } else if (brand) {
        this.getData('brand', brand);
      } else if (subCategory) {
        this.getData('subcategory', subCategory);
      } else {
        this.router.navigate(['/404']);
      }
    });
    this.getUserWishlists();
  }

  getData(searchItem: string, id: string) {
    this.ngxSpinner.show();
    this.isLoading.set(true);
    this.producsSevice.getProductsBy(searchItem, id).subscribe({
      next: (data: Iproduct[]) => {
        this.ngxSpinner.hide();
        this.isLoading.set(false);
        this.offline.set(false);
        this.data.set(data);
        if (data.length === 0) {
          this.emptyData.set(true);
        }
      },

      error: (err) => {
        this.ngxSpinner.hide();
        this.isLoading.set(false);
        if (!navigator.onLine) {
          this.offline.set(true);
        } else if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.data.set([]);
          this.emptyData.set(true);
        }
      },
    });
  }

  get isUserLogin() {
    return this.authAervice.getIsLoggedIn_;
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
