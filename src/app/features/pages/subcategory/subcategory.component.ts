import { SubcategoriesService } from './../../services/subcategories/subcategories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { SubcategoryCardComponent } from '../../components/subcategory-card/subcategory-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IsubCategory } from '../../models/subcategory/Isub-category.js';
import { IapiResponse } from '../../models/api-response/Iapi-response.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../services/categories/categories.service.js';
import { Icategory } from '../../models/category/Icategory.js';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  imports: [SubcategoryCardComponent, RouterLink],
})
export class SubcategoryComponent implements OnInit {
  subcategories: WritableSignal<IsubCategory[]> = signal([]);
  category: WritableSignal<Icategory | null> = signal(null);
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
    this.subcategoriesService.getAllSubCategoriesOnCategory(catId).subscribe({
      next: (res: IapiResponse<IsubCategory[]>) => {
        this.ngxSpinnerService.hide();
        this.subcategories.set(res.data.filter((item) => item.category === catId));
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
      },
    });
  }
  getCategory(catId: string) {
    this.ngxSpinnerService.show();
    this.categoriesService.getSpecificCatgegory(catId).subscribe({
      next: (res: IapiResponse<Icategory>) => {
        this.ngxSpinnerService.hide();
        this.category.set(res.data);
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
      },
    });
  }
}
