import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-title',
  templateUrl: './shared-title.component.html',
  styleUrls: ['./shared-title.component.css'],
})
export class SharedTitleComponent implements OnInit {
  title: InputSignal<string> = input.required();
  content: InputSignal<string> = input.required();
  constructor() {}

  ngOnInit() {}
}
