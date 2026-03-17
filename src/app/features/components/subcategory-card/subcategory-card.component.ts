import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IsubCategory } from '../../models/subcategory/Isub-category.js';

@Component({
  selector: 'app-subcategory-card',
  templateUrl: './subcategory-card.component.html',
  styleUrls: ['./subcategory-card.component.css'],
  imports: [RouterLink],
})
export class SubcategoryCardComponent implements OnInit {
  subcategory: InputSignal<IsubCategory> = input.required();
  constructor() {}

  ngOnInit() {}
}
