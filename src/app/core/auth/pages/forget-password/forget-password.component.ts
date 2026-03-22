import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service.js';
import { IforgetPassword } from '../../models/forget-password-response/Iforget-password.js';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  imports: [RouterLink, ReactiveFormsModule],
})
export class ForgetPasswordComponent implements OnInit {
  counter: WritableSignal<number> = signal(1);
  showPass: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  forgetPasswordForm: FormGroup;
  verifyCodeForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.verifyCodeForm = this.fb.group(
      {
        resetCode: ['', Validators.required],
      },

      {
        validators: [this.checkCodeLength],
      },
    );
    this.resetPasswordForm = this.fb.group({
      email: [''],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#!%*?&]{8,}$/),
        ],
      ],
    });
  }

  ngOnInit() {}
  sendResetCode() {
    if (this.forgetPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.forgotPassword(this.forgetPasswordForm.value).subscribe({
        next: (res: IforgetPassword) => {
          this.isLoading.set(false);
          this.counter.set(2);
          this.toasterService.success(res.message, res.statusMsg);
        },
        error: (err: IforgetPassword) => {
          this.isLoading.set(false);
          this.toasterService.error(err.message, err.statusMsg);
        },
      });
    }
    console.log(this.forgetPasswordForm.value);
  }
  verifyCode() {
    if (this.verifyCodeForm.valid) {
      this.isLoading.set(true);
      this.authService.verifyResetPassword(this.verifyCodeForm.value).subscribe({
        next: (res: any) => {
          this.isLoading.set(false);
          this.counter.set(3);
          this.toasterService.success('Correct code', 'Success');
        },
        error: (err: IforgetPassword) => {
          this.isLoading.set(false);
          this.toasterService.error(err.message, err.statusMsg);
        },
      });
    }
    console.log(this.verifyCodeForm.value);
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordForm.patchValue({
        email: this.forgetPasswordForm.get('email')?.value,
      });
      this.isLoading.set(true);
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res: any) => {
          this.counter.set(4);
          this.isLoading.set(false);
          this.toasterService.success('Password changed successfully', 'Success');
          this.router.navigate(['/login']);
        },
        error: (err: IforgetPassword) => {
          this.isLoading.set(false);
          this.toasterService.error(err.message, err.statusMsg);
        },
      });
    }

    console.log(this.resetPasswordForm.value);
  }

  get emailController() {
    return this.forgetPasswordForm.get('email');
  }
  get codeController() {
    return this.verifyCodeForm.get('resetCode');
  }
  get newPasswordController() {
    return this.resetPasswordForm.get('newPassword');
  }

  hasLowerCase() {
    return /[a-z]/.test(this.newPasswordController?.value);
  }

  hasUpperCase() {
    return /[A-Z]/.test(this.newPasswordController?.value);
  }

  hasNumber() {
    return /\d/.test(this.newPasswordController?.value);
  }

  hasSpecialChar() {
    return /[@$!%*?&]/.test(this.newPasswordController?.value);
  }

  checkCodeLength(form: AbstractControl) {
    const code = form.get('resetCode');
    if (code?.value.length < 6) {
      return {
        codeLength: true,
      };
    }
    return null;
  }
  togglePass() {
    this.showPass.update((p) => !p);
  }
}
