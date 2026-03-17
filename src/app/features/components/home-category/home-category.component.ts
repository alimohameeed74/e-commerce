import { CategoriesService } from './../../services/categories/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { Icategory } from '../../models/category/Icategory.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { ContentLoaderComponent } from '../../../core/layouts/components/content-loader/content-loader.component';
import { SharedTitleComponent } from '../../../shared/components/shared-title/shared-title.component';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css'],
  imports: [CategoryCardComponent, ContentLoaderComponent, SharedTitleComponent],
})
export class HomeCategoryComponent implements OnInit {
  categories: WritableSignal<Icategory[]> = signal([]);
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.getLimitedCategories(10);
  }

  getLimitedCategories(limit: number) {
    this.categoriesService.getLimitedCategories(limit).subscribe({
      next: (res: IapiResponse<Icategory[]>) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
