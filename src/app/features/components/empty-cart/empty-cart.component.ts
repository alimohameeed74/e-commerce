import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service.js';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.css'],
  imports: [RouterLink],
})
export class EmptyCartComponent implements OnInit {
  title: InputSignal<string> = input.required();
  icon: InputSignal<string> = input.required();
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  get userLogged() {
    return this.authService.getIsLoggedIn_;
  }
}
