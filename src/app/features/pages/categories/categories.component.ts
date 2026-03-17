import { IapiResponse } from './../../models/api-response/Iapi-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from './../../services/categories/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Icategory } from '../../models/category/Icategory.js';
import { ContentLoaderComponent } from '../../../core/layouts/components/content-loader/content-loader.component';
import { CategoryCardDetailsComponent } from '../../components/category-card-details/category-card-details.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [ContentLoaderComponent, CategoryCardDetailsComponent],
})
export class CategoriesComponent implements OnInit {
  categories: WritableSignal<Icategory[]> = signal([]);
  constructor(
    private categoriesService: CategoriesService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.ngxSpinnerService.show();
    this.categoriesService.getAllCategories().subscribe({
      next: (res: IapiResponse<Icategory[]>) => {
        this.ngxSpinnerService.hide();
        this.categories.set(res.data);
        console.log(res.data);
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
      },
    });
  }
}
