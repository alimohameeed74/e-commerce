import { BrandsService } from './../../services/brands/brands.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ibrand } from '../../models/brand/Ibrand.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandCardComponent } from '../../components/brand-card/brand-card.component';
import { EmptyItemsComponent } from '../../components/empty-items/empty-items.component';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  imports: [RouterLink, BrandCardComponent, EmptyItemsComponent, InternetConnectionComponent],
})
export class BrandsComponent implements OnInit {
  brands: WritableSignal<Ibrand[]> = signal([]);
  emptyBrands: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  constructor(
    private brandsService: BrandsService,
    private ngxSpinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getAllBrands();
  }
  getAllBrands() {
    this.ngxSpinner.show();
    this.brandsService.getAllBrands().subscribe({
      next: (data: Ibrand[]) => {
        this.ngxSpinner.hide();
        this.brands.set(data);
      },
      error: (err) => {
        this.ngxSpinner.hide();
        if (!navigator.onLine) {
          this.offline.set(true);
        } else if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.brands.set([]);
          this.emptyBrands.set(true);
        }
      },
    });
  }
}
