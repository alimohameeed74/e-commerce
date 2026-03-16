import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { Iproduct } from '../../models/product/Iproduct.js';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<IapiResponse<Iproduct[]>> {
    return this.httpClient.get<IapiResponse<Iproduct[]>>(`${environment.apiURL}/products`);
  }
  getSpecificProduct() {}
}
