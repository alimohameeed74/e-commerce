import { CategoriesService } from './../../services/categories/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { Icategory } from '../../models/category/Icategory.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { ContentLoaderComponent } from '../../../core/layouts/components/content-loader/content-loader.component';
import { SharedTitleComponent } from '../../../shared/components/shared-title/shared-title.component';
import { EmptyItemsComponent } from '../empty-items/empty-items.component';
import { InternetConnectionComponent } from '../internet-connection/internet-connection.component';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css'],
  imports: [
    CategoryCardComponent,
    ContentLoaderComponent,
    SharedTitleComponent,
    EmptyItemsComponent,
    InternetConnectionComponent,
  ],
})
export class HomeCategoryComponent implements OnInit {
  categories: WritableSignal<Icategory[]> = signal([]);
  emptyCategories: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading.set(true);
    this.categoriesService.getAllCategories().subscribe({
      next: (data: Icategory[]) => {
        this.isLoading.set(false);
        this.categories.set(data);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.categories.set([]);
          this.emptyCategories.set(true);
        } else if (!navigator.onLine) {
          this.offline.set(true);
        }
      },
    });
  }
}
