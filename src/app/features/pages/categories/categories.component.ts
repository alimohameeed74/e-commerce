import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from './../../services/categories/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Icategory } from '../../models/category/Icategory.js';
import { CategoryCardDetailsComponent } from '../../components/category-card-details/category-card-details.component';
import { EmptyItemsComponent } from '../../components/empty-items/empty-items.component';
import { InternetConnectionComponent } from '../../components/internet-connection/internet-connection.component';
import { RouterLink } from '@angular/router';
import { HomeCategoryComponent } from '../../components/home-category/home-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  imports: [RouterLink, HomeCategoryComponent],
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
