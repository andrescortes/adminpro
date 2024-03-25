import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, LoginResponse, RegisterForm } from '../interfaces';
import { environment } from '../../environments/environment';
import { Observable, catchError, defer, from, map, of, tap, throwError } from 'rxjs';
import { ToasterService } from './toaster.service';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.base_url;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly toasterService: ToasterService,
  ) {
  }

  createUser(form: RegisterForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/users`, form)
      .pipe(
        tap((resp: LoginResponse) => {
          if (resp.token && resp.user && resp.user.email) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.user.email);
          }
        })
      );
  }

  loginUser(form: LoginForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login`, form)
      .pipe(
        tap((resp: LoginResponse) => {
          if (resp.token && resp.user && resp.user.email) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.user.email);
          }
        })
      );
  }

  loginGoogle(token: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login/google`, { token })
      .pipe(
        tap((resp: LoginResponse) => {
          if (resp.token && resp.user && resp.user.email) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.user.email);
          }
        })
      );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.httpClient.get<LoginResponse>(`${this.url}/login/refresh`, {
      headers: {
        'x-token': token
      }
    })
      .pipe(
        tap((resp: LoginResponse) => {
          if (resp.token && resp.user && resp.user.email) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('email', resp.user.email);
          }
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): void {
    google.accounts.id.disableAutoSelect();
    const email = localStorage.getItem('email') ?? 'User';

    const response = new Promise((resolve, reject) => {
      google.accounts.id.revoke(email, (done: any) => {
        if (done.error) {
          reject(done.error);
        } else {
          resolve(done.successful);
        }
      });
    });

    defer(() => from(response)
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }),
        catchError((err) => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          const googleNoIdentity = 'opt_out_or_no_session';
          if (err === googleNoIdentity) {
            const errorCustom = new Error('failed');
            return throwError(() => errorCustom);
          }
          return throwError(() => new Error(err));
        })
      ))
      .subscribe({
        next: () => {
          this.toasterService.logoutSuccess(email.toUpperCase());
        },
        error: (err: any) => {
          if (err === 'failed') {
            this.toasterService.logoutSuccess(email.toUpperCase());
            return;
          }
          this.toasterService.logoutSuccess(email.toUpperCase());
        }
      });

  }

}
