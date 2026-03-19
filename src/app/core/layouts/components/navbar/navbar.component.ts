import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
})
export class NavbarComponent implements OnInit {
  showSideBar: WritableSignal<boolean> = signal(false);
  @ViewChild('toggler') toggler!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  get isUserLogin() {
    return this.authService.getIsLoggedIn_;
  }
  get userData() {
    return this.authService.getUserData;
  }
  toggleSideBar() {
    this.showSideBar.update((e) => !e);
  }
  closeSideBar() {
    this.showSideBar.set(false);
  }
  @HostListener('document:click', ['$event']) function(e: Event) {
    if (!this.toggler.nativeElement.contains(e.target)) this.closeSideBar();
  }
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.authService.userLogout();
  }
}
