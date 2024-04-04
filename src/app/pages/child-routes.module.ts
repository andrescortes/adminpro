import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { adminGuard } from '../guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './maintenances/doctors/doctor/doctor.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './maintenances/users/users.component';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'graph1', component: Grafica1Component, data: { title: 'Graph 1' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'promises', component: PromiseComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'search/:id', component: SearchComponent, data: { title: 'Search' } },
  //maintenances
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  // routes of admins
  {
    path: 'users',
    canActivate: [
      adminGuard
    ],
    component: UsersComponent,
    data: { title: 'App Users' }
  },
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
