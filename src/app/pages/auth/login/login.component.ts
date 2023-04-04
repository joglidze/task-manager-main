import { AuthInterceptor } from './../../../core/interceptors/auth.interceptor';
import { catchError, throwError } from 'rxjs';
import { AuthFacadeService } from './../auth-facade.service';
import { AuthService } from './../../../core/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  get getEmail() {
    return this.form.get('email');
  }
  get getPassword() {
    return this.form.get('password');
  }

  constructor(
    private authService: AuthService,
    private authFacadeService: AuthFacadeService,
    private toast: NgToastService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.authService
      .login(this.form.value)
      .pipe(
        catchError(({ error }) => {
          this.authFacadeService.setErrors(error.message);
          return throwError(error);
        })
      )
      .subscribe({
        next: (res) => {
          AuthInterceptor.accessToken = res.token.accessToken;
          this.toast.success({
            detail: 'Success Message',
            summary: 'Login is Success',
            duration: 4000,
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error Message',
            summary: err.message,
            duration: 4000,
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.authFacadeService.destroy();
  }
}
