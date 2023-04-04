import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
  
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, BehaviorSubject, filter, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{ 
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(
    private authService: AuthService,
    private toastService: NgToastService,
    private router: Router,
    private http: HttpClient
  ) {}

  static accessToken = ''

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

   const accessToken = this.authService.getToken()

    if(accessToken){
       request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`
        })})
    }
    return next.handle(request)
    .pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401){
        return this.handle401Error(request,next)
      }else{
        return throwError(error)
      }
    }))

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler){
    if(!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any)=>{
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token.accessToken}`
        }
        )
      }))
        })
      )

    }else{
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token =>{
          return next.handle(request.clone({
            headers: new HttpHeaders({
              Authorization: `Bearer ${token.accessToken}`
            })
          }))
        })
      )
    }
  }
}