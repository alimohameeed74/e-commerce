import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { Iproduct } from '../../models/product/Iproduct.js';
import { IapiResponseSingleData } from '../../models/api-response-single-data/Iapi-response-single-data.js';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<Iproduct[]> {
    return this.httpClient
      .get<IapiResponse<Iproduct[]>>(`${environment.apiURL}/products`)
      .pipe(map((res) => res.data));
  }
  getSpecificProduct(id: string): Observable<Iproduct> {
    return this.httpClient
      .get<IapiResponseSingleData<Iproduct>>(`${environment.apiURL}/products/${id}`)
      .pipe(map((res) => res.data));
  }
  getLimitedProducts(limit: number): Observable<IapiResponse<Iproduct[]>> {
    return this.httpClient.get<IapiResponse<Iproduct[]>>(
      `${environment.apiURL}/products?limit=${limit}`,
    );
  }

  getProductsBy(data: string, id: string): Observable<Iproduct[]> {
    return this.httpClient
      .get<IapiResponse<Iproduct[]>>(`${environment.apiURL}/products?${data}=${id}`)
      .pipe(map((res) => res.data));
  }
}
