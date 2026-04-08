import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from './../../services/categories/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Icategory } from '../../models/category/Icategory.js';
import { CategoryCardDetailsComponent } from '../../components/category-card-details/category-card-details.component';
import { EmptyItemsComponent } from '../../components/empty-items/empty-items.component';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [
    CategoryCardDetailsComponent,
    EmptyItemsComponent,
    InternetConnectionComponent,
    RouterLink,
  ],
})
export class CategoriesComponent implements OnInit {
  categories: WritableSignal<Icategory[]> = signal([]);
  emptyCategories: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
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
      next: (data: Icategory[]) => {
        this.ngxSpinnerService.hide();
        this.categories.set(data);
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        if (!navigator.onLine) {
          this.offline.set(true);
        } else if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.categories.set([]);
          this.emptyCategories.set(true);
        }
      },
    });
  }
}
