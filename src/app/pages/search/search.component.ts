import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchesService, ToasterService } from '../../services';
import { IDoctor, IDoctorApi, IHospital, ISearchAll, IUser } from '../../interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchParam: string = '';
  users: IUser[] = [];
  doctors: IDoctorApi[] = [];
  hospitals: IHospital[] = [];
  isThereUsers: boolean = false;
  isThereHospitals: boolean = false;
  isThereDoctors: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchesService: SearchesService,
    private readonly toasterService: ToasterService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((args: Params) => {
      const param = String(args[ 'id' ]);
      if (param) {
        this.searchParam = param;
      }
    });
  }

  ngAfterViewInit(): void {
    this.findData();
  }

  findData(): void {
    if (this.searchParam.length === 0) {
      this.toasterService.info('Please enter a term to search', 'Info');
      return;
    }
    this.searchesService.findByTerm(this.searchParam)
      .pipe(
        tap((response: ISearchAll) => {
          this.users = response.data.users;
          this.doctors = response.data.doctors;
          this.hospitals = response.data.hospitals;
        }),
        tap(() => {
          this.isThereUsers = this.users.length > 0;
          this.isThereHospitals = this.hospitals.length > 0;
          this.isThereDoctors = this.doctors.length > 0;
        })
      )
      .subscribe({
        error: (err) => {
          this.toasterService.error(err.error.msg ?? 'Something went wrong', 'Error');
        }
      });
  }

  redirectToDoctorPage(id: string): void {
    if (!id) {
      this.toasterService.info('Doctor not found', 'Info');
      return;
    }
    this.router.navigate([ 'dashboard', 'doctor', id ]);
  }
}
