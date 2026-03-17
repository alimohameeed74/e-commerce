import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { IsubCategory } from '../../models/subcategory/Isub-category.js';
import { environment } from '../../../../environments/environment.development.js';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private httpClient: HttpClient) {}
  getAllSubCategories() {}
  getSpecificSubCategory() {}
  getAllSubCategoriesOnCategory(catId: string): Observable<IapiResponse<IsubCategory[]>> {
    return this.httpClient.get<IapiResponse<IsubCategory[]>>(
      `${environment.apiURL}/categories/${catId}/subcategories`,
    );
  }
}
