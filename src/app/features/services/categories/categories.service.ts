import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { Icategory } from '../../models/category/Icategory.js';
import { environment } from '../../../../environments/environment.development.js';
import { IapiResponseSingleData } from '../../models/api-response-single-data/Iapi-response-single-data.js';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getAllCategories(): Observable<IapiResponse<Icategory[]>> {
    return this.httpClient.get<IapiResponse<Icategory[]>>(`${environment.apiURL}/categories`);
  }
  getLimitedCategories(limit: number): Observable<IapiResponse<Icategory[]>> {
    return this.httpClient.get<IapiResponse<Icategory[]>>(
      `${environment.apiURL}/categories?limit=${limit}`,
    );
  }
  getSpecificCatgegory(id: string): Observable<IapiResponseSingleData<Icategory>> {
    return this.httpClient.get<IapiResponseSingleData<Icategory>>(
      `${environment.apiURL}/categories/${id}`,
    );
  }
}
