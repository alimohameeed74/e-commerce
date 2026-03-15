import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ProductCardComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
