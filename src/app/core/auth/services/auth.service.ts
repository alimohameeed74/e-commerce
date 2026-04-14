import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Iregister } from '../models/register/Iregister.js';
import { firstValueFrom, Observable } from 'rxjs';
import { IapiAuthResponse } from '../models/api-auth-response/Iapi-auth-response.js';
import { environment } from '../../../../environments/environment.development.js';
import { Ilogin } from '../models/login/Ilogin.js';
import { Iuser } from '../models/user/Iuser.js';
import { IforgetPassword } from '../models/forget-password-response/Iforget-password.js';
import { IforgetPasswordForm } from '../models/forget-password-form/Iforget-password-form.js';
import { IverifyTokenResponse } from '../models/verify-token-response/Iverify-token-response.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: WritableSignal<boolean> = signal(false);
  private userData: WritableSignal<Iuser> = signal({ name: '', role: '', email: '' });
  private token: WritableSignal<string | null> = signal(null);
  constructor(private httpClient: HttpClient) {}
  init() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      this.token.set(token);
      this.isLoggedIn.set(true);
      this.userData.set(JSON.parse(userData));
    } else {
      this.token.set(null);
      this.isLoggedIn.set(false);
    }
  }

  get getIsLoggedIn_() {
    return this.isLoggedIn();
  }

  get getToken(): string | null {
    return this.token();
  }

  holdUserData(data: Iuser) {
    this.userData.set(data);
  }

  get getUserData() {
    return this.userData();
  }

  userLogin() {
    this.isLoggedIn.set(true);
  }
  userLogout() {
    this.isLoggedIn.set(false);
  }

  login(data: Ilogin): Observable<IapiAuthResponse> {
    return this.httpClient.post<IapiAuthResponse>(`${environment.apiURL}/auth/signin`, data);
  }
  register(data: Iregister): Observable<IapiAuthResponse> {
    return this.httpClient.post<IapiAuthResponse>(`${environment.apiURL}/auth/signup`, data);
  }
  forgotPassword(data: IforgetPasswordForm): Observable<IforgetPassword> {
    return this.httpClient.post<IforgetPassword>(
      `${environment.apiURL}/auth/forgotPasswords`,
      data,
    );
  }
  verifyResetPassword(data: IforgetPasswordForm): Observable<IforgetPassword> {
    return this.httpClient.post<IforgetPassword>(
      `${environment.apiURL}/auth/verifyResetCode`,
      data,
    );
  }
  resetPassword(data: IforgetPasswordForm): Observable<IforgetPassword> {
    return this.httpClient.put<IforgetPassword>(`${environment.apiURL}/auth/resetPassword`, data);
  }
  verifyToken(): Observable<IverifyTokenResponse> {
    return this.httpClient.get<IverifyTokenResponse>(`${environment.apiURL}/auth/verifyToken`);
  }
}
