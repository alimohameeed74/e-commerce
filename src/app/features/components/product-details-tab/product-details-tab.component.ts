import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  styleUrls: ['./product-details-tab.component.css'],
})
export class ProductDetailsTabComponent implements OnInit {
  category: InputSignal<string> = input.required();
  subCategory: InputSignal<string> = input.required();
  brand: InputSignal<string> = input.required();
  itemsSold: InputSignal<number> = input.required();
  productDesc: InputSignal<string> = input.required();
  constructor() {}

  ngOnInit() {}
}
