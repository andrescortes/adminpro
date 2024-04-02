import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService, HospitalService, ModalImageService, ToasterService } from '../../../../services';
import { Subscription, concatMap, delay, map, of, skip } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctorApi, IHospital, IHospitalResponse } from '../../../../interfaces';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit, OnDestroy {
  doctorForm!: FormGroup;
  hospitals: IHospital[] = [];
  hospitalSubcription$!: Subscription;
  updateImageSubcription!: Subscription;
  hospital: IHospital | undefined;
  imgDefault: string = 'http://localhost:3000/api/uploads/collections/hospitals/no-image.png';
  doctorToUpdate: IDoctorApi | undefined;
  paramRouter: string = '';
  isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toasterService: ToasterService,
    private readonly hospitalService: HospitalService,
    private readonly doctorService: DoctorService,
    private readonly activateRoute: ActivatedRoute,
    private readonly modalImageService: ModalImageService,
    private readonly router: Router,
  ) {
    this.updateImageSubcription = this.onChangesImageUpdate();
  }

  ngOnInit(): void {
    this.doctorForm = this.createForm();
    this.paramRouter = this.activateRoute.snapshot.params[ 'id' ];
    this.getHospitals();
  }

  ngOnDestroy(): void {
    this.hospitalSubcription$?.unsubscribe();
    this.updateImageSubcription?.unsubscribe();
    this.doctorToUpdate = undefined;
    this.hospital = undefined;
    this.resetForm();
  }

  onChangesImageUpdate(): Subscription {
    return this.modalImageService.updateImg$
      .pipe(
        skip(1),
        delay(1000)
      )
      .subscribe(() => {
        this.getDoctorById();
      });
  }

  openModal() {
    if (!this.doctorToUpdate) return;
    this.modalImageService.openModal('doctors', this.doctorToUpdate.uid);
  }

  get isNew(): boolean {
    return this.paramRouter === 'new';
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });
  }

  onChangesForm(): Subscription {
    return this.doctorForm.get('hospital')!.valueChanges
      .subscribe((value: string) => {
        if (value) {
          this.hospital = this.getHospital(value);
        } else {
          this.hospital = undefined;
        }
      });
  }

  getHospital(uid: string): IHospital | undefined {
    const hospital = this.hospitals.find(hospital => hospital.uid === uid);
    if (!hospital) {
      return undefined;
    }
    return hospital;
  }

  getHospitals(): void {
    this.isLoading = true;
    this.hospitalService
      .getHospitals()
      .pipe(
        concatMap((resp: IHospitalResponse) => {
          if (this.isNew) {
            return of(resp);
          }
          return this.doctorService.getDoctors().pipe(
            map((doctors: IDoctorApi[]) => {
              this.doctorToUpdate = doctors.find(doctor => doctor.uid === this.paramRouter);
              return resp;
            })
          )
        })
      )
      .subscribe({
        next: (resp) => {
          this.hospitals = resp.hospitals;
          this.hospitalSubcription$ = this.onChangesForm();
          if (this.doctorToUpdate) {
            this.hospital = this.getHospital(this.doctorToUpdate.hospital._id);
          }
          this.loadFormValues();
          this.isLoading = false;
        },
        error: (error) => {
          this.toasterService.error(error.error.msg, 'Error');
          this.isLoading = false;
        }
      });
  }

  loadFormValues(): void {
    if (!this.doctorToUpdate) return;
    this.doctorForm.patchValue({
      name: this.doctorToUpdate.name,
      hospital: this.doctorToUpdate.hospital._id
    });
  }

  onSubmit() {
    if (!this.paramRouter) return;
    if (this.paramRouter === 'new') {
      this.createDoctor();
    } else {
      this.updateDoctor();
    }
  }

  createDoctor() {
    const { name, hospital } = this.doctorForm.value;
    this.isLoading = true;
    this.doctorService.createDoctor(name, hospital)
      .subscribe({
        next: () => {
          this.toasterService.success('Doctor created', 'Success');
          this.hospital = undefined;
          this.resetForm();
          this.isLoading = false;
          this.router.navigate([ 'dashboard/doctors' ]);
        },
        error: (error) => {
          this.toasterService.error(error.error.msg, 'Error');
        }
      });
  }

  updateDoctor() {
    const { name, hospital } = this.doctorForm.value;
    this.isLoading = true;
    this.doctorService.updateDoctor(this.paramRouter, name, hospital)
      .subscribe({
        next: () => {
          this.toasterService.success('Doctor updated', 'Success');
          this.isLoading = false;
          this.hospital = undefined;
          this.resetForm();
          this.router.navigate([ 'dashboard/doctors']);
        },
        error: (error) => {
          this.toasterService.error(error.error.msg, 'Error');
          this.isLoading = false;
        }
      });
  }

  getDoctorById() {
    if (!this.paramRouter || this.paramRouter === 'new') return;
    this.isLoading = true;
    this.doctorService.getDoctors()
      .subscribe({
        next: (resp) => {
          const doctor = resp.find(doctor => doctor.uid === this.paramRouter);
          if (!doctor) {
            throw new Error('Doctor not found');
          }
          this.doctorToUpdate = doctor;
          this.doctorForm.patchValue({
            name: doctor.name,
            hospital: doctor.hospital._id
          });
          this.hospital = this.getHospital(doctor.hospital._id);
          this.isLoading = false;
        },
        error: (error) => {
          this.toasterService.error(error.error.msg, 'Error');
          this.isLoading = false;
        }
      });
  }

  resetForm() {
    this.doctorForm.reset();
  }
}
