import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, defer, delay, from, switchMap } from 'rxjs';
import { ToasterService, ModalImageService, DoctorService } from '../../../services';
import { IDoctorApi } from '../../../interfaces';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef;
  doctors!: IDoctorApi[];
  isLoading: boolean = true;
  updateImageSubcription!: Subscription;

  constructor(
    private readonly doctorService: DoctorService,
    private readonly toasterService: ToasterService,
    private readonly modalImageService: ModalImageService
  ) {
    this.updateImageSubcription = this.onChangesImageUpdate();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.updateImageSubcription.unsubscribe();
  }

  onChangesImageUpdate(): Subscription {
    return this.modalImageService.updateImg$
      .pipe(
        delay(1000)
      )
      .subscribe(() => {
        this.loadDoctors();
      });
  }

  loadDoctors(): void {
    this.isLoading = true;
    this.doctorService.getDoctors()
      .subscribe({
        next: (resp) => {
          this.doctors = resp;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  deleteDoctor(uidHospital: string) {
    const res = this.toasterService.questionWithConfirmAndClose(
      'Doctor deleted',
      `Success`, 'Doctor');
    from(defer(() => res))
      .pipe(
        switchMap((isDeleted: boolean) => {
          if (isDeleted && uidHospital) {
            return this.doctorService.deleteDoctor(uidHospital);
          } else {
            return from([ false ]);
          }
        })
      ).subscribe((res) => {
        if (res) {
          this.loadDoctors();
        }
      });
  }

  openModal(doctor: IDoctorApi) {
    if (!doctor.uid) return;
    this.modalImageService.openModal('doctors', doctor.uid);
  }
}
