import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import {
  FileUploadService,
  ToasterService,
  UserService
} from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  user!: User;
  imgUpload!: File;
  imgPreview!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toasterService: ToasterService,
    private readonly fileUploadService: FileUploadService,
  ) {
    this.profileForm = this.createForm();
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.loadForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  loadForm(): void {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email
    });
  }

  onSubmit() {
    const { name, email } = this.profileForm.value;
    if (this.profileForm.invalid) {
      return;
    }

    if (this.user.uid && this.user.role) {
      this.userService.updateUser(this.user.uid, name, email, this.user.role)
        .subscribe({
          next: () => {
            this.user.name = name;
            this.user.email = email;
            this.toasterService.success('Profile updated', `Welcome ${name.toUpperCase()}`);
          },
          error: (err) => {
            this.toasterService.error(err.error.msg, 'Error');
          }
        });
    }
  }

  validateChanges() {
    const { name, email } = this.profileForm.value;
    return name !== this.user.name || email !== this.user.email;
  }

  onFileChange($event: Event) {
    if (!$event.target) {
      return;
    }
    const file = ($event.target as HTMLInputElement).files?.[ 0 ];
    if (!file) {
      this.imgUpload = null!;
      this.imgPreview = null!;
      this.toasterService.error('File not found', 'Error');
      return;
    }
    if ((file.size / 1024) > 2000) {
      this.toasterService.error('File must be less than 2MB', 'Error');
      return;
    }
    this.imgUpload = file;
    this.imgPreview = URL.createObjectURL(file);
  }

  onUpload() {
    if (!this.imgUpload) {
      return;
    }
    this.fileUploadService
      .updateFile(this.imgUpload, 'users', this.user.uid!)
      .then(res => res.json())
      .then(({ fileName }: any) => {
        this.user.img = fileName;
        this.toasterService.success('File uploaded', 'Success');
      })
      .catch((err: any) => {
        this.imgUpload = null!;
        this.imgPreview = null!;
        this.toasterService.error(err?.message, 'Error');
      });
  }
}
