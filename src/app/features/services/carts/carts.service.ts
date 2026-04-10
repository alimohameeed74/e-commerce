import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IcartApiResponse } from '../../models/cart-api-response/Icart-api-response.js';
import { environment } from '../../../../environments/environment.development.js';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private httpclient: HttpClient) {}
  addProductToUserCart(productId: string): Observable<{ status: string; message: string }> {
    return this.httpclient
      .post<IcartApiResponse>(`${environment.apiURL}/cart`, {
        productId: productId,
      })
      .pipe(
        map((res) => {
          return { status: res.status, message: res.message };
        }),
      );
  }
  getLoggedUserCarts(): Observable<IcartApiResponse> {
    return this.httpclient.get<IcartApiResponse>(`${environment.apiURL}/cart`);
  }
  removeProductFromCart(productId: string): Observable<IcartApiResponse> {
    return this.httpclient.delete<IcartApiResponse>(`${environment.apiURL}/cart/${productId}`);
  }

  clearUserCarts(): Observable<IcartApiResponse> {
    return this.httpclient.delete<IcartApiResponse>(`${environment.apiURL}/cart`);
  }

  updateCartProductQuantity(productId: string, count: number): Observable<IcartApiResponse> {
    return this.httpclient.put<IcartApiResponse>(`${environment.apiURL}/cart/${productId}`, {
      count: count,
    });
  }
}
