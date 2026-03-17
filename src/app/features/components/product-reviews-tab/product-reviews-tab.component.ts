import { Component, input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  // productReviews: InputSignal<Ireview[]> = input.required();
  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {}
}
