import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IshippingAddress } from '../../models/order/Ishipping-address';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development.js';
import { IonlineOrderResponse } from '../../models/api-response-order/online-order-response/Ionline-order-response.js';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  createCashOrder(cartId: string, shippingAddress: IshippingAddress): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiURLV2}/orders/${cartId}`, shippingAddress);
  }
  checkoutSession(
    cartId: string,
    shippingAddress: IshippingAddress,
  ): Observable<IonlineOrderResponse> {
    return this.httpClient.post<IonlineOrderResponse>(
      `${environment.apiURL}/orders/checkout-session/${cartId}?url=${environment.baseURL}`,
      shippingAddress,
    );
  }
}
