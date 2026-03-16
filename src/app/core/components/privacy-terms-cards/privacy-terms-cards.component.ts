import { Component, input, InputSignal, OnInit } from '@angular/core';
import { PrivacyTermsFooterComponent } from '../privacy-terms-footer/privacy-terms-footer.component';
import { IprivacyCard } from '../../models/privacy/privacy-card.js';

@Component({
  selector: 'app-privacy-terms-cards',
  templateUrl: './privacy-terms-cards.component.html',
  styleUrls: ['./privacy-terms-cards.component.css'],
})
export class PrivacyTermsCardsComponent implements OnInit {
  Crads: InputSignal<IprivacyCard[]> = input.required();

  constructor() {}

  ngOnInit() {}
}
