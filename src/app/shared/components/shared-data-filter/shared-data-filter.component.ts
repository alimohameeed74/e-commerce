import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../features/services/products/products.service.js';
import { Iproduct } from '../../../features/models/product/Iproduct.js';
import { IapiAuthResponse } from '../../../core/auth/models/api-auth-response/Iapi-auth-response.js';
import { IapiResponse } from '../../../features/models/api-response/Iapi-response.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductCardComponent } from '../../../features/components/product-card/product-card.component';

@Component({
  selector: 'app-shared-data-filter',
  templateUrl: './shared-data-filter.component.html',
  styleUrls: ['./shared-data-filter.component.css'],
  imports: [ProductCardComponent],
})
export class SharedDataFilterComponent implements OnInit {
  data: WritableSignal<Iproduct[]> = signal([]);
  constructor(
    private router: Router,
    private producsSevice: ProductsService,
    private activatedRoute: ActivatedRoute,
    private ngxSpinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      const category = param.get('category');
      const brand = param.get('brand');
      const subCategory = param.get('subcategory');
      if (category) {
        this.getData('category', category);
      } else if (brand) {
        this.getData('brand', brand);
      } else if (subCategory) {
        this.getData('subcategory', subCategory);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  getData(searchItem: string, id: string) {
    this.ngxSpinner.show();
    this.producsSevice.getProductsBy(searchItem, id).subscribe({
      next: (res: IapiResponse<Iproduct[]>) => {
        this.ngxSpinner.hide();
        this.data.set(res.data);
      },
      error: (err) => {
        this.ngxSpinner.hide();
        console.log(err);
      },
    });
  }
}
