import { Component, input, InputSignal, OnInit } from '@angular/core';
import { PrivacyTermsCardsComponent } from '../../components/privacy-terms-cards/privacy-terms-cards.component';
import { IprivacyCard } from '../../models/privacy/privacy-card.js';
import { PrivacyTermsFooterComponent } from '../../components/privacy-terms-footer/privacy-terms-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  imports: [PrivacyTermsCardsComponent, PrivacyTermsFooterComponent, RouterLink],
})
export class TermsComponent implements OnInit {
  termsCrads: InputSignal<IprivacyCard[]> = input([
    {
      icon: 'fa-handshake',
      title: 'Acceptance of Terms',
      items: [
        {
          id: '1.1',
          text: 'By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
        },
        {
          id: '1.2',
          text: 'If you do not agree to these Terms, you must not access or use the Service.',
        },
        {
          id: '1.3',
          text: 'We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.',
        },
      ],
    },
    {
      icon: 'fa-user-check',
      title: 'User Eligibility',
      items: [
        {
          id: '2.1',
          text: 'The Service is intended for users who are at least eighteen (18) years of age.',
        },
        {
          id: '2.2',
          text: 'By using the Service, you represent and warrant that you are of legal age to form a binding contract.',
        },
        {
          id: '2.3',
          text: 'If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.',
        },
      ],
    },
    {
      icon: 'fa-id-card',
      title: 'Account Registration',
      items: [
        {
          id: '3.1',
          text: 'You may be required to create an account to access certain features of the Service.',
        },
        {
          id: '3.2',
          text: 'You agree to provide accurate, current, and complete information during registration.',
        },
        {
          id: '3.3',
          text: 'You are solely responsible for maintaining the confidentiality of your account credentials.',
        },
        {
          id: '3.4',
          text: 'You agree to notify us immediately of any unauthorized use of your account.',
        },
      ],
    },
    {
      icon: 'fa-credit-card',
      title: 'Orders and Payments',
      items: [
        {
          id: '4.1',
          text: 'All orders placed through the Service are subject to acceptance and availability.',
        },
        {
          id: '4.2',
          text: 'Prices are subject to change without notice prior to order confirmation.',
        },
        {
          id: '4.3',
          text: 'Payment must be made in full at the time of purchase through approved payment methods.',
        },
        {
          id: '4.4',
          text: 'We reserve the right to refuse or cancel any order at our sole discretion.',
        },
      ],
    },
    {
      icon: 'fa-truck',
      title: 'Shipping and Delivery',
      items: [
        {
          id: '5.1',
          text: 'Shipping times are estimates only and are not guaranteed.',
        },
        {
          id: '5.2',
          text: 'Risk of loss and title for items purchased pass to you upon delivery to the carrier.',
        },
        {
          id: '5.3',
          text: 'We are not responsible for delays caused by carriers, customs, or other factors beyond our control.',
        },
      ],
    },
    {
      icon: 'fa-rotate-left',
      title: 'Returns and Refunds',
      items: [
        {
          id: '6.1',
          text: 'Our return policy allows returns within 14 days of delivery for most items.',
        },
        {
          id: '6.2',
          text: 'Products must be unused and in original packaging.',
        },
        {
          id: '6.3',
          text: 'Refunds will be processed within 5-7 business days after receiving the returned item.',
        },
      ],
    },
    {
      icon: 'fa-scale-balanced',
      title: 'Limitation of Liability',
      items: [
        {
          text: 'To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.',
        },
      ],
    },
  ]);
  constructor() {}

  ngOnInit() {}
}
