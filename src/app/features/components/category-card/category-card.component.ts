import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Icategory } from '../../models/category/Icategory.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
  imports: [RouterLink],
})
export class CategoryCardComponent implements OnInit {
  category: InputSignal<Icategory> = input.required();
  constructor() {}

  ngOnInit() {}
}
