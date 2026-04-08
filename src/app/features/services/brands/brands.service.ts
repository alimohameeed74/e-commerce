import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { Ibrand } from '../../models/brand/Ibrand.js';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}
  getAllBrands(): Observable<Ibrand[]> {
    return this.httpClient
      .get<IapiResponse<Ibrand[]>>(`${environment.apiURL}/brands`)
      .pipe(map((res) => res.data));
  }
}
