import { Component, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IprivacyCard } from '../../models/privacy/privacy-card.js';
import { PrivacyTermsFooterComponent } from '../../components/privacy-terms-footer/privacy-terms-footer.component';
import { PrivacyTermsCardsComponent } from '../../components/privacy-terms-cards/privacy-terms-cards.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  imports: [RouterLink, PrivacyTermsCardsComponent, PrivacyTermsFooterComponent],
})
export class PrivacyComponent implements OnInit {
  privacyPolicyCrads: WritableSignal<IprivacyCard[]> = signal([
    {
      icon: 'fa-database',
      title: 'Information We Collect',
      items: [
        {
          id: '1.1',
          title: 'Personal Data',
          text: 'Name, email address, phone number, and shipping address.',
        },
        {
          id: '1.2',
          title: 'Payment Data',
          text: 'Credit card information processed securely through our payment providers.',
        },
        {
          id: '1.3',
          title: 'Technical Data',
          text: 'IP address, browser type, device information, and access times.',
        },
        {
          id: '1.4',
          title: 'Usage Data',
          text: 'Pages viewed, products browsed, and actions taken within our platform.',
        },
      ],
    },
    {
      icon: 'fa-user-shield',
      title: 'How We Use Your Information',
      items: [
        { id: '2.1', text: 'To process and fulfill your orders.' },
        { id: '2.2', text: 'To send order confirmations and shipping updates.' },
        { id: '2.3', text: 'To provide customer support and respond to inquiries.' },
        { id: '2.4', text: 'To improve our products, services, and user experience.' },
        { id: '2.5', text: 'To send promotional communications (with your consent).' },
      ],
    },
    {
      icon: 'fa-lock',
      title: 'Data Protection',
      items: [
        {
          id: '3.1',
          text: 'We implement industry-standard encryption (SSL/TLS) for all data transfers.',
        },
        { id: '3.2', text: 'Payment information is processed by PCI-compliant payment providers.' },
        { id: '3.3', text: 'We conduct regular security audits and vulnerability assessments.' },
        { id: '3.4', text: 'Access to personal data is restricted to authorized personnel only.' },
      ],
    },
    {
      icon: 'fa-share-nodes',
      title: 'Information Sharing',
      items: [
        {
          id: '4.1',
          text: 'We do not sell, trade, or rent your personal information to third parties.',
        },
        {
          id: '4.2',
          text: 'We may share data with trusted service providers who assist in our operations.',
        },
        {
          id: '4.3',
          text: 'We may disclose information when required by law or to protect our rights.',
        },
      ],
    },
    {
      icon: 'fa-user-check',
      title: 'Your Rights',
      items: [
        { id: '5.1', title: 'Access', text: 'Request a copy of your personal data.' },
        { id: '5.2', title: 'Rectification', text: 'Request correction of inaccurate data.' },
        { id: '5.3', title: 'Erasure', text: 'Request deletion of your personal data.' },
        { id: '5.4', title: 'Portability', text: 'Request your data in a portable format.' },
        {
          id: '5.5',
          title: 'Opt-out',
          text: 'Unsubscribe from marketing communications at any time.',
        },
      ],
    },
    {
      icon: 'fa-cookie',
      title: 'Cookies',
      items: [
        {
          id: '6.1',
          text: 'We use cookies to enhance your browsing experience and remember preferences.',
        },
        { id: '6.2', text: 'You can control cookie settings through your browser preferences.' },
        { id: '6.3', text: 'Disabling cookies may affect the functionality of certain features.' },
      ],
    },
    {
      icon: 'fa-clock',
      title: 'Data Retention',
      items: [
        {
          text: 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.',
        },
      ],
    },
  ]);
  constructor() {}

  ngOnInit() {}
}
