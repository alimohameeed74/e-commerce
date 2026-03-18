import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Iregister } from '../models/register/Iregister.js';
import { Observable } from 'rxjs';
import { IapiAuthResponse } from '../models/api-auth-response/Iapi-auth-response.js';
import { environment } from '../../../../environments/environment.development.js';
import { Ilogin } from '../models/login/Ilogin.js';
import { Iuser } from '../models/user/Iuser.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: WritableSignal<boolean> = signal(false);
  private userData: WritableSignal<Iuser> = signal({ name: '', role: '', email: '' });
  constructor(private httpClient: HttpClient) {}
  init() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      this.isLoggedIn.set(true);
      this.userData.set(JSON.parse(userData));
      console.log('form app yes');
    }
  }
  get getIsLoggedIn_() {
    return this.isLoggedIn();
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
  forgetPassword() {}
}
