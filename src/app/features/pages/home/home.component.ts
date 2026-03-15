import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';
import { HomeCategoryComponent } from '../../components/home-category/home-category.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HomeHeaderComponent, HomeProductsComponent, HomeCategoryComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
