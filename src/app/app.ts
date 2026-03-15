import { Component, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavbarComponent } from './core/layouts/components/navbar/navbar.component';
import { FooterComponent } from './core/layouts/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule, NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
  ngOnInit(): void {
    initFlowbite();
  }
}
