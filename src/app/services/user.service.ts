import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserPage, IUserPaginated, LoginForm, LoginResponse, RegisterForm } from '../interfaces';
import { environment } from '../../environments/environment';
import { Observable, catchError, defer, from, map, of, tap, throwError } from 'rxjs';
import { ToasterService } from './toaster.service';
import { User } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.base_url;
  private _user!: User;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly toasterService: ToasterService,
  ) { }

  public get user(): User {
    return this._user;
  }

  private updateUserProperties({ user }: LoginResponse): void {
    if (!user) return;
    this._user = new User(user.name, user.email).bind(user);
  }

  createUser(form: RegisterForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/users`, form)
      .pipe(
        tap(this.updateToken.bind(this))
      );
  }

  updateUser(userId: string, name: string, email: string, role: string): Observable<LoginResponse> {
    return this.httpClient.put<LoginResponse>(`${this.url}/users/${userId}`, { name, email, role }, this.headers)
      .pipe(
        tap(this.updateToken.bind(this)),
        tap(this.updateUserProperties.bind(this))
      );
  }

  updateRoleUser(userId: string, name: string, email: string, role: string): Observable<LoginResponse> {
    return this.httpClient.put<LoginResponse>(`${this.url}/users/${userId}`, { name, email, role }, this.headers);
  }

  deleteUser(uid: string): Observable<boolean> {
    return this.httpClient.delete<void>(`${this.url}/users/${uid}`, this.headers)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  loginUser(form: LoginForm): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login`, form)
      .pipe(
        tap(this.updateToken.bind(this))
      );
  }

  loginGoogle(token: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login/google`, { token })
      .pipe(
        tap(this.updateToken.bind(this))
      );
  }

  validateToken(): Observable<boolean> {
    return this.httpClient.get<LoginResponse>(`${this.url}/login/refresh`, this.headers)
      .pipe(
        map((resp: LoginResponse) => {
          this.updateUserProperties(resp);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    google.accounts.id.disableAutoSelect();
    const email = localStorage.getItem('email') || '';
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
        catchError((err) => {
          const googleNoIdentity = 'opt_out_or_no_session';
          if (err === googleNoIdentity) {
            return throwError(() => new Error('failed'));
          }
          localStorage.removeItem('token');
          localStorage.removeItem('email');
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

  loadUsers(from = 0, limit = 5, time: number = 0): Observable<IUserPaginated> {
    return new Observable((observer) => {
      setTimeout(() => {
        this.httpClient.get<IUserPage>(`${this.url}/users?from=${from}&limit=${limit}`, this.headers)
          .pipe(
            map(({ users, total, ok }): IUserPaginated => {
              let userMapped = users.map((user) => new User(user.name, user.email).bind(user));
              return {
                ok,
                total,
                users: userMapped
              }
            })
          )
          .subscribe({
            next: (resp) => {
              observer.next(resp);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            }
          });
      }, time);
    })
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private updateToken(response: LoginResponse): void {
    if (response.token && response.user && response.user.email) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.user?.email);
    }
  }

}
