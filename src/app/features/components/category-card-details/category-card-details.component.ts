import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Icategory } from '../../models/category/Icategory.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card-details',
  templateUrl: './category-card-details.component.html',
  styleUrls: ['./category-card-details.component.css'],
  imports: [RouterLink],
})
export class CategoryCardDetailsComponent implements OnInit {
  category: InputSignal<Icategory> = input.required();

  constructor() {}

  ngOnInit() {}
}
