import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { IsubCategory } from '../../models/subcategory/Isub-category.js';
import { environment } from '../../../../environments/environment.development.js';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllSubCategoriesOnCategory(catId: string): Observable<IsubCategory[]> {
    return this.httpClient
      .get<IapiResponse<IsubCategory[]>>(`${environment.apiURL}/categories/${catId}/subcategories`)
      .pipe(map((res) => res.data.filter((ele) => ele.category === catId)));
  }
}
