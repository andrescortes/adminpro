import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HospitalService, ModalImageService, ToasterService } from '../../../services';
import { HospitalHelper } from '../../../models/hospital-helper.model';
import { Subscription, debounceTime, delay, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements AfterViewInit, OnDestroy {
  hospitals!: HospitalHelper[];
  isLoading: boolean = true;
  updateImageSubcription!: Subscription;
  @ViewChild('txtSearch') txtSearch!: ElementRef;

  constructor(
    private readonly hospitalService: HospitalService,
    private readonly toasterService: ToasterService,
    private readonly modalImageService: ModalImageService
  ) {
    this.updateImageSubcription = this.onChangesImageUpdate();
  }
  ngAfterViewInit(): void {
    this.searchHospitals();
  }

  searchHospitals(): void {
    fromEvent(this.txtSearch.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        map((event: any) => (event.target as HTMLInputElement).value),
        switchMap(value => {
          if (value.length === 0) {
            return this.hospitalService.loadHospitals();
          }
          return this.hospitalService.searchHospitals(value, 'hospitals')
        })
      )
      .subscribe((hospitals) => {
        this.hospitals = hospitals;
      });
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
        this.loadHospitals();
      });
  }

  loadHospitals(): void {
    this.isLoading = true;
    this.hospitalService.loadHospitals()
      .subscribe({
        next: (hospitals) => {
          this.hospitals = hospitals;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  async openSweetAlert() {
    const title = 'Create hospital';
    const inputPlaceholder = 'Enter hospital name';
    const inputLabel = 'Name';
    const { value: name } = await this.toasterService
      .modalWithValue(title, inputLabel, inputPlaceholder);
    if (!name) {
      return;
    }
    this.isLoading = true;
    this.hospitalService.createHospital(name)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toasterService.success('Hospital created', 'Success');
          this.loadHospitals();
        },
        error: (error) => {
          this.isLoading = false;
          this.toasterService.error(error.error.msg, 'Error');
        }
      });
  }

  updateHospital(hospital: HospitalHelper): void {
    this.isLoading = true;
    this.hospitalService.updateHospital(hospital)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toasterService.success('Hospital updated', 'Success');
          this.loadHospitals();
        },
        error: (error) => {
          this.isLoading = false;
          this.toasterService.error(error.error.msg, 'Error');
        }
      });

  }

  deleteHospital(uidHospital: string) {
    this.hospitalService.deleteHospital(uidHospital)
      .subscribe({
        next: () => {
          this.toasterService.success('Hospital deleted', 'Success');
          this.loadHospitals();
        },
        error: (error) => {
          this.toasterService.error(error.error.msg, 'Error');
        }
      });
  }

  openModal(hospital: HospitalHelper) {
    if (!hospital.uid) return;
    this.modalImageService.openModal('hospitals', hospital.uid);
  }
}
