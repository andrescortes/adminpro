import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginForm, LoginResponse } from '../../interfaces';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  formSubmitted = false;
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toasterService: ToasterService,
    private readonly router: Router,
    private readonly _ngZone: NgZone
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadRemember();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  async googleInit(): Promise<void> {
    return new Promise((resolve) => {
      google.accounts.id.initialize({
        client_id: environment.google_client_id,
        callback: (response: any) => this.handleCredentialResponse(response),
      });
      google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        {
          theme: 'filled_blue',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'signin_with',
        }
      );
      resolve(void 0);
    });
  }

  handleCredentialResponse(resp: any): void {
    this.userService.loginGoogle(resp.credential).subscribe({
      next: (res: LoginResponse) => {
        this.toasterService.loginSuccess(res.user?.name.toUpperCase() ?? 'USER');
        this._ngZone.run(() => {
          this.router.navigate([ 'dashboard' ]);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.error(err?.error?.msg ?? 'User not created', 'Error');
      }
    });
  };

  loadRemember() {
    const email = localStorage.getItem('email');
    if (email) {
      this.loginForm.get('email')?.setValue(email);
      this.loginForm.get('remember')?.setValue(true);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ],
      remember: [ false ]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.toasterService.warning('Fullfill all fields', 'Warning');
      return;
    }
    const dataUser = this.loginForm.value as LoginForm;
    this.userService.loginUser(dataUser).subscribe({
      next: (data) => {
        if (dataUser.remember) {
          localStorage.setItem('email', dataUser.email);
        } else {
          localStorage.removeItem('email');
        }
        this.toasterService.loginSuccess(data.user?.name.toUpperCase() ?? 'user');
        this.router.navigate([ 'dashboard' ]);
      },
      error: (err: HttpErrorResponse) => {
        this.toasterService.error(err?.error?.msg ?? 'User not logged', 'Error');
        console.error({ err });
      }
    });
  }

  fieldNotValid(field: string): boolean {
    if (this.loginForm.get(field)?.invalid) {
      return true;
    }
    return false;
  }
}
