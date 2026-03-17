import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from './../../services/products/products.service';
import { AfterViewInit, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Iproduct } from '../../models/product/Iproduct.js';
import { IapiResponseSingleData } from '../../models/api-response-single-data/Iapi-response-single-data.js';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductDiscountPipe } from '../../pipes/product/productDiscount.pipe.js';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [RouterLink, CurrencyPipe, ProductDiscountPipe],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: WritableSignal<Iproduct | null> = signal(null);
  productAvgRate: WritableSignal<number> = signal(0);
  starsArr: WritableSignal<string[]> = signal([]);
  isAvgRateFloat: WritableSignal<boolean> = signal(false);
  constructor(
    private productsService: ProductsService,
    private nxSpinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    });
  }
  getProductDetails(id: string) {
    this.nxSpinnerService.show();
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res: IapiResponseSingleData<Iproduct>) => {
        this.nxSpinnerService.hide();
        this.product.set(res.data);
        this.productAvgRate.set(Math.floor(this.product()!.ratingsAverage));
        if (this.productAvgRate() === Math.round(this.product()!.ratingsAverage)) {
          this.isAvgRateFloat.set(false);
        } else {
          this.isAvgRateFloat.set(true);
        }
        this.stars();
      },
      error: (err) => {
        this.nxSpinnerService.hide();
        console.log(err);
      },
    });
  }

  stars() {
    for (let i = 0; i < this.productAvgRate(); i++) {
      this.starsArr().push('fa-solid fa-star');
    }
    if (this.isAvgRateFloat()) {
      this.starsArr().push('fa-solid fa-star-half-stroke');
    }
    for (let i = 0; i < 5 - Math.round(this.product()!.ratingsAverage); i++) {
      this.starsArr().push('fa-regular fa-star');
    }
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
