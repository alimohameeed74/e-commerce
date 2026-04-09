import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { Icategory } from '../../models/category/Icategory.js';
import { environment } from '../../../../environments/environment.development.js';
import { IapiResponseSingleData } from '../../models/api-response-single-data/Iapi-response-single-data.js';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  getAllCategories(): Observable<Icategory[]> {
    return this.httpClient
      .get<IapiResponse<Icategory[]>>(`${environment.apiURL}/categories`)
      .pipe(map((res) => res.data));
  }

  getSpecificCatgegory(id: string): Observable<Icategory> {
    return this.httpClient
      .get<IapiResponseSingleData<Icategory>>(`${environment.apiURL}/categories/${id}`)
      .pipe(map((res) => res.data));
  }
}
