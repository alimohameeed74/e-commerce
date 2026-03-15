import { ProductsService } from './../../services/products/products.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharedTitleComponent } from '../../../shared/components/shared-title/shared-title.component';
import { Iproduct } from '../../models/product/Iproduct.js';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.css'],
  imports: [ProductCardComponent, SharedTitleComponent],
})
export class HomeProductsComponent implements OnInit {
  products: WritableSignal<Iproduct[]> = signal([]);
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products.set(res?.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
