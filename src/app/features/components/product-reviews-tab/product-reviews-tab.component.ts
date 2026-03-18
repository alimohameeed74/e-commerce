import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { Ireview } from '../../models/review/Ireview.js';

@Component({
  selector: 'app-product-reviews-tab',
  templateUrl: './product-reviews-tab.component.html',
  styleUrls: ['./product-reviews-tab.component.css'],
})
export class ProductReviewsTabComponent implements OnInit, OnChanges {
  productReviewsCount: InputSignal<number> = input.required();
  productAvgRate: InputSignal<number> = input.required();
  stars: InputSignal<string[]> = input.required();
  productReviews: InputSignal<Ireview[]> = input.required();
  reviewsObj: WritableSignal<{ starNum: number; count: number; percent: string }[]> = signal([]);
  counter: number = 0;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {
    this.reviewsObj.set([]);
    for (let i of [1, 2, 3, 4, 5]) {
      this.getPercentages(i);
    }
    console.log(this.reviewsObj());
  }

  getPercentages(rate: number) {
    this.counter = 0;
    if (this.productReviews().length === 0) return;
    this.productReviews().forEach((review) => {
      if (Math.round(review.rating) === rate) {
        this.counter++;
      }
    });
    this.reviewsObj().push({
      starNum: rate,
      count: this.counter,
      percent: `${(this.counter / this.productReviews().length) * 100}`,
    });
  }
}
