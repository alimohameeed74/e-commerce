import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-items',
  templateUrl: './empty-items.component.html',
  styleUrls: ['./empty-items.component.css'],
})
export class EmptyItemsComponent implements OnInit {
  data: InputSignal<string> = input.required();
  constructor() {}

  ngOnInit() {}
}
