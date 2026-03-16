import { BrandsService } from './../../services/brands/brands.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ibrand } from '../../models/brand/Ibrand.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { BrandCardComponent } from '../../components/brand-card/brand-card.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  imports: [RouterLink, BrandCardComponent],
})
export class BrandsComponent implements OnInit {
  brands: WritableSignal<Ibrand[]> = signal([]);
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
      next: (res: IapiResponse<Ibrand[]>) => {
        this.ngxSpinner.hide();
        this.brands.set(res.data);
      },
      error: (err) => {
        this.ngxSpinner.hide();
        console.log(err);
      },
    });
  }
}
