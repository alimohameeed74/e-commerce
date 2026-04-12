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
import { ToastrService } from 'ngx-toastr';

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
  isLoading: WritableSignal<boolean> = signal(false);
  offline: WritableSignal<boolean> = signal(false);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
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
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])\S{8,}$/),
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
    return /[^A-Za-z\d\s]/.test(this.passwordController?.value);
  }

  hasSpaces() {
    return /\s/.test(this.passwordController?.value);
  }

  register() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: IapiAuthResponse) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userData', JSON.stringify(res.user));
          this.authService.userLogin();
          this.authService.holdUserData(res.user);
          this.isLoading.set(false);
          this.toasterService.success(res.message, 'account created!', {
            timeOut: 3000,
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading.set(false);

          if (err?.status === 409) {
            this.toasterService.error(err?.statusMsg, err?.message);
            this.router.navigate(['/login']);
          } else if (!navigator.onLine) {
            this.toasterService.error('fail', 'No internet', {
              timeOut: 3000,
            });
          } else {
            this.toasterService.error(err?.statusMsg, err?.message);
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
