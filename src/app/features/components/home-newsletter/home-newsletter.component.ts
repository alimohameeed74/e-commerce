import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-newsletter',
  templateUrl: './home-newsletter.component.html',
  styleUrls: ['./home-newsletter.component.css'],
  imports: [RouterLink],
})
export class HomeNewsletterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
