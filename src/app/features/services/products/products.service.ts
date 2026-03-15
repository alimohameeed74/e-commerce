import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.apiURL}/products`);
  }
  getSpecificProducts() {}
}
