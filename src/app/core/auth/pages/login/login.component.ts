import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service.js';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IapiAuthResponse } from '../../models/api-auth-response/Iapi-auth-response.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: WritableSignal<boolean> = signal(false);
  showRePassword: WritableSignal<boolean> = signal(false);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
  }

  ngOnInit() {
    this.clearForm();
  }

  get emailController() {
    return this.loginForm.get('email');
  }
  get passwordController() {
    return this.loginForm.get('password');
  }

  hasLowerCase() {
    return /[a-z]/.test(this.passwordController?.value);
  }

  hasUpperCase() {
    return /[A-Z]/.test(this.passwordController?.value);
  }

  hasNumber() {
    return /\d/.test(this.passwordController?.value);
  }

  hasSpecialChar() {
    return /[@$!%*?&]/.test(this.passwordController?.value);
  }

  login() {
    if (this.loginForm.valid) {
      this.ngxSpinner.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: IapiAuthResponse) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.authService.userLogin();
          this.authService.holdUserData(res.user);
          this.ngxSpinner.hide();
          this.toasterService.success(res.message, 'signed in!', {
            timeOut: 3000,
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.ngxSpinner.hide();
          this.toasterService.error(err?.error?.statusMsg, err?.error?.message);
        },
      });
    }
  }
  clearForm() {
    this.loginForm.reset({
      email: '',
      password: '',
    });
  }

  togglePass() {
    this.showPassword.update((p) => !p);
  }
  toggleRePass() {
    this.showRePassword.update((p) => !p);
  }
}
