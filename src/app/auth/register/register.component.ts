import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RegisterForm } from '../../interfaces';
import { ToasterService } from '../../services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastr: ToasterService,
    private readonly router: Router
  ) {
    this.registerForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [ 'carlos', [ Validators.required, Validators.minLength(3) ] ],
      email: [ 'carlos@gm.com', [ Validators.required, Validators.email ] ],
      password: [ '123456', [ Validators.required, Validators.minLength(6) ] ],
      password2: [ '123456', [ Validators.required, Validators.minLength(6) ] ],
      terms: [ true, [ Validators.required, Validators.requiredTrue ] ]
    }, { validators: [ this.mathPassword ] });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const form: RegisterForm = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.userService.createUser(form).subscribe({
      next: (data) => {
        this.toastr.success(`User created ${data.user?.name}`, 'Success');
        this.router.navigate([ 'login' ]);
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err?.error?.msg ?? 'User not created', 'Error');
      }
    });
  }

  fieldNotValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  validatePasswords(): boolean {
    const pass = this.registerForm?.get('password')?.value;
    const confirmPass = this.registerForm?.get('password2')?.value;
    if (pass !== confirmPass && this.formSubmitted) {
      return true;
    }
    return false;
  }

  mathPassword(control: AbstractControl): ValidationErrors | null {
    if (control) {
      const pass = control.get('password')?.value;
      const confirmPass = control.get('password2')?.value;
      if (pass === confirmPass) {
        control.get('password')?.setErrors(null);
        control.get('password2')?.setErrors(null);
        return null;
      } else {
        control.get('password')?.setErrors({ mathPassword: true });
        control.get('password2')?.setErrors({ mathPassword: true });
        return { mathPassword: true };
      }
    }
    return null;
  }
}
