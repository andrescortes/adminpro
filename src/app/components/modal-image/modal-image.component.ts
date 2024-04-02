import { Component } from '@angular/core';
import {
  FileUploadService,
  ModalImageService,
  ToasterService
} from '../../services';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})
export class ModalImageComponent {
  hideModal = true;
  imgUpload!: File;
  imgPreview!: string;
  typeCollection!: 'users' | 'doctors' | 'hospitals';
  uid!: string;

  constructor(
    private readonly modalImageService: ModalImageService,
    private readonly toasterService: ToasterService,
    private readonly fileUploadService: FileUploadService
  ) {
    this.modalImageService.hideModal$.subscribe(open => {
      this.hideModal = open;
    });
  }

  closeModal(): void {
    this.imgPreview = null!;
    this.modalImageService.closeModal();
  }

  onUpload() {
    if (!this.imgUpload) {
      return;
    }
    this.typeCollection = this.modalImageService.typeCollection;
    this.uid = this.modalImageService.uid;
    this.fileUploadService
      .updateFile(this.imgUpload, this.typeCollection, this.uid)
      .then(res => res.json())
      .then(() => {
        this.closeModal();
        this.modalImageService.updateImg();
        this.toasterService.success('File uploaded', 'Success');
      })
      .catch((err: any) => {
        this.imgUpload = null!;
        this.imgPreview = null!;
        this.toasterService.error(err?.message, 'Error');
      });
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
}
