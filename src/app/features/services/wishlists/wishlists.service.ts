import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IwishlistResponse } from '../../models/wishlist/Iwishlist-response.js';
import { environment } from '../../../../environments/environment.development.js';
import { IdeleteWishlistResponse } from '../../models/wishlist/Idelete-wishlist-response.js';

@Injectable({
  providedIn: 'root',
})
export class WishlistsService {
  constructor(private httpclient: HttpClient) {}

  addProductToUserWishlist(productId: string): Observable<IdeleteWishlistResponse> {
    return this.httpclient.post<IdeleteWishlistResponse>(`${environment.apiURL}/wishlist`, {
      productId: productId,
    });
  }
  getLoggedUserWishlists(): Observable<IwishlistResponse> {
    return this.httpclient.get<IwishlistResponse>(`${environment.apiURL}/wishlist`);
  }
  removeProductFromWishlist(productId: string): Observable<IdeleteWishlistResponse> {
    return this.httpclient.delete<IdeleteWishlistResponse>(
      `${environment.apiURL}/wishlist/${productId}`,
    );
  }
}
