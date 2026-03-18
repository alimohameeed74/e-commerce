import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service.js';
import { IapiAuthResponse } from '../../models/api-auth-response/Iapi-auth-response.js';
import { Toast, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: WritableSignal<boolean> = signal(false);
  showRePassword: WritableSignal<boolean> = signal(false);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private ngxSpinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        rePassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      {
        validators: [this.checkPasswords],
      },
    );
  }

  ngOnInit() {
    this.clearForm();
  }

  get nameController() {
    return this.registerForm.get('name');
  }
  get emailController() {
    return this.registerForm.get('email');
  }
  get passwordController() {
    return this.registerForm.get('password');
  }
  get rePasswordController() {
    return this.registerForm.get('rePassword');
  }
  get phoneController() {
    return this.registerForm.get('phone');
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

  register() {
    if (this.registerForm.valid) {
      this.ngxSpinner.show();
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: IapiAuthResponse) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.authService.userLogin();
          this.authService.holdUserData(res.user);
          this.ngxSpinner.hide();
          this.toasterService.success(res.message, 'account created!', {
            timeOut: 3000,
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.ngxSpinner.hide();
          this.toasterService.error(err?.error?.statusMsg, err?.error?.message);
          console.log(err);
          if (err?.status === 409) {
            this.router.navigate(['/login']);
          }
        },
      });
    }
  }
  clearForm() {
    this.registerForm.reset({
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    });
  }

  checkPasswords(form: AbstractControl) {
    const password = form.get('password');
    const rePassword = form.get('rePassword');
    if (rePassword?.value !== password?.value) {
      return {
        match: false,
      };
    } else {
      return null;
    }
  }

  togglePass() {
    this.showPassword.update((p) => !p);
  }
  toggleRePass() {
    this.showRePassword.update((p) => !p);
  }
}
