import { Component, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
  ngOnInit(): void {
    initFlowbite();
  }
}
