import { Token } from './../interfaces/token';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { CookieStorageService } from './cookie.service';
import { IUser } from './../interfaces/user';
import { Observable, tap } from 'rxjs';
import { Login, Register, AuthResponse } from './../interfaces/auth';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  errorMessage?: string;

  constructor(
    private cookieStorageService: CookieStorageService,
    private toast: NgToastService,
    private router: Router,
    http: HttpClient
  ) {
    super(http);
  }

  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload).pipe(
      tap((response: AuthResponse) => {
        const cookieExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

        this.setToken('token', response.token.accessToken, cookieExpire);
        this.setRefreshToken('refreshToken', response.token.refreshToken);
        this.setUser(response.user);
      })
    );
  }

  register(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }

  refreshToken() {
    return this.post<any>('auth/token', {
      refreshToken: this.getRefreshTok(),
    }).pipe(
      tap((tokens: Token) => {
        this.setToken(
          'token',
          tokens.accessToken,
          new Date(Date.now() + 24 * 60 * 60 * 1000)
        );
      })
    );
  }

  setToken(name: string, token: string, time: any) {
    this.cookieStorageService.setCookie(name, token, time);
  }

  setRefreshToken(name: string, token: string) {
    this.cookieStorageService.setCookie(name, token);
  }

  getToken() {
    return this.cookieStorageService.getCookie('token');
  }

  getRefreshTok(): string {
    return this.cookieStorageService.getCookie('refreshToken');
  }

  setUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  signOut() {
    this.cookieStorageService.deleteCookie('token');
    this.cookieStorageService.deleteCookie('refreshToken');
    this.cookieStorageService.deleteAllCookies();
    localStorage.clear();
  }

  getError(error: string) {
    this.errorMessage = error;
    //console.log()(this.errorMessage)
  }
}
