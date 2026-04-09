import { SubcategoriesService } from './../../services/subcategories/subcategories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SubcategoryCardComponent } from '../../components/subcategory-card/subcategory-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsubCategory } from '../../models/subcategory/Isub-category.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../services/categories/categories.service.js';
import { Icategory } from '../../models/category/Icategory.js';
import { EmptyItemsComponent } from '../../components/empty-items/empty-items.component';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  imports: [SubcategoryCardComponent, RouterLink, EmptyItemsComponent, InternetConnectionComponent],
})
export class SubcategoryComponent implements OnInit {
  subcategories: WritableSignal<IsubCategory[]> = signal([]);
  category: WritableSignal<Icategory | null> = signal(null);
  emptySubcategories: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  offline_: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(
    private activatedRote: ActivatedRoute,
    private subcategoriesService: SubcategoriesService,
    private categoriesService: CategoriesService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.activatedRote.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getCategory(id);
        this.getAllSubCategories(id);
      }
    });
  }

  getAllSubCategories(catId: string) {
    this.ngxSpinnerService.show();
    this.subcategoriesService.getAllSubCategoriesOnCategory(catId).subscribe({
      next: (data: IsubCategory[]) => {
        this.ngxSpinnerService.hide();
        this.subcategories.set(data);
        if (data.length === 0) {
          this.emptySubcategories.set(true);
        }
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        if (!navigator.onLine) {
          this.offline.set(true);
        } else if (err?.status === 404 || err?.status === 400 || err?.status === 500) {
          this.subcategories.set([]);
          this.emptySubcategories.set(true);
        }
      },
    });
  }
  getCategory(catId: string) {
    this.isLoading.set(true);
    this.categoriesService.getSpecificCatgegory(catId).subscribe({
      next: (data: Icategory) => {
        this.isLoading.set(false);
        this.category.set(data);
      },
      error: (err) => {
        this.offline_.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
