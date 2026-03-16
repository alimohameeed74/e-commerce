import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Ibrand } from '../../models/brand/Ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.css'],
  imports: [RouterLink],
})
export class BrandCardComponent implements OnInit {
  brand: InputSignal<Ibrand> = input.required();
  constructor() {}

  ngOnInit() {}
}
