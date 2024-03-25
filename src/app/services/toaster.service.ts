import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { }

  success(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text
    });
  }

  loginSuccess(name: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
      text: `Welcome ${name.toUpperCase()}`,
    });
  }

  logoutSuccess(email: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed out successfully",
      text: `Bye ${email.toUpperCase()}`,
    });
  }

  error(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }

  warning(title: string, text: string): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      timer: 2500,
      showCloseButton: false
    });
  }

  info(title: string, text: string): void {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      timer: 1000
    });
  }

  question(title: string, text: string): void {
    Swal.fire({
      icon: 'question',
      title: title,
      text: text
    });
  }

  questionWithCancel(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      showCancelButton: true
    });
  }

  questionWithConfirm(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      showConfirmButton: true
    });
  }

  questionWithConfirmAndCancel(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      showCancelButton: true,
      showConfirmButton: true
    });
  }

  questionWithConfirmAndClose(title: string, text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: text,
      showConfirmButton: true,
      allowOutsideClick: false
    });
  }
}
