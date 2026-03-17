import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { HomeHeaderComponent } from '../../components/home-header/home-header.component';
import { HomeCategoryComponent } from '../../components/home-category/home-category.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { HomeMiddleCardsComponent } from '../../components/home-middle-cards/home-middle-cards.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    HomeHeaderComponent,
    HomeProductsComponent,
    HomeCategoryComponent,
    HomeMiddleCardsComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
