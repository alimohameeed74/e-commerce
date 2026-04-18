import { Component, OnInit } from '@angular/core';
import { HomeCategoryComponent } from '../../components/home-category/home-category.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { HomeMiddleCardsComponent } from '../../components/home-middle-cards/home-middle-cards.component';
import { HomeNewsletterComponent } from '../../components/home-newsletter/home-newsletter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    HomeProductsComponent,
    HomeCategoryComponent,
    HomeMiddleCardsComponent,
    HomeNewsletterComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
