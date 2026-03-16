import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-terms-footer',
  templateUrl: './privacy-terms-footer.component.html',
  styleUrls: ['./privacy-terms-footer.component.css'],
  imports: [RouterLink],
})
export class PrivacyTermsFooterComponent implements OnInit {
  view: InputSignal<string> = input.required();
  link: InputSignal<string> = input.required();
  constructor() {}

  ngOnInit() {}
}
