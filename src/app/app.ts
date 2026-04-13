import { Component, signal, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NavbarComponent } from './core/layouts/components/navbar/navbar.component';
import { FooterComponent } from './core/layouts/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service.js';
import { IverifyTokenResponse } from './core/auth/models/verify-token-response/Iverify-token-response.js';
import { InternetConnectionComponent } from './features/components/internet-connection/internet-connection.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './core/services/spinner/spinner.service.js';

@Component({
  selector: 'app-root',
  imports: [
    NgxSpinnerModule,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    InternetConnectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
  isLoading: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  error: WritableSignal<boolean> = signal(false);
  constructor(
    private authService: AuthService,
    private ngxSpinner: NgxSpinnerService,
    private toasterService: ToastrService,
    public spinnerService: SpinnerService,
  ) {}
  ngOnInit(): void {
    initFlowbite();
    this.authService.init();
    this.verifyToken();
  }

  verifyToken() {
    this.isLoading.set(true);
    this.spinnerService.setSpinnerText('Verifying session...');
    this.ngxSpinner.show();
    this.authService.verifyToken().subscribe({
      next: (res: IverifyTokenResponse) => {
        this.isLoading.set(false);
        this.ngxSpinner.hide();
        this.spinnerService.resetSpinnerText();
      },
      error: (err) => {
        this.ngxSpinner.hide();
        this.spinnerService.resetSpinnerText();
        if (err?.status === 401) {
          this.authService.userLogout();
          localStorage.clear();
          this.toasterService.warning('Please sign in first', 'Warning', {
            timeOut: 2000,
          });
          this.isLoading.set(false);
        } else if (!navigator.onLine) {
          this.offline.set(true);
        } else {
          this.error.set(true);
        }
      },
    });
  }
}
