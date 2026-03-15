import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Iproduct } from '../../models/product/Iproduct.js';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductDiscountPipe } from '../../pipes/product/productDiscount.pipe.js';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [RouterLink, CurrencyPipe, ProductDiscountPipe],
})
export class ProductCardComponent implements OnInit, OnChanges {
  product: InputSignal<Iproduct> = input.required();
  productAvgRate: WritableSignal<number> = signal(0);
  starsArr: WritableSignal<string[]> = signal([]);
  isAvgRateFloat: WritableSignal<boolean> = signal(false);
  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {
    this.productAvgRate.set(Math.floor(this.product().ratingsAverage));
    if (this.productAvgRate() === Math.round(this.product().ratingsAverage)) {
      this.isAvgRateFloat.set(false);
    } else {
      this.isAvgRateFloat.set(true);
    }
    this.stars();
  }
  stars() {
    for (let i = 0; i < this.productAvgRate(); i++) {
      this.starsArr().push('fa-solid fa-star');
    }
    if (this.isAvgRateFloat()) {
      this.starsArr().push('fa-solid fa-star-half-stroke');
    }
    for (let i = 0; i < 5 - Math.round(this.product().ratingsAverage); i++) {
      this.starsArr().push('fa-regular fa-star');
    }
  }
}
