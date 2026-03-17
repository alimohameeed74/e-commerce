import { Component, OnInit } from '@angular/core';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [HomeProductsComponent, RouterLink],
})
export class ShopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
