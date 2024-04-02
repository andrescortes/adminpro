import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { authGuard } from '../guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './maintenances/doctors/doctor/doctor.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './maintenances/users/users.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [
            authGuard
        ],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'graph1', component: Grafica1Component, data: { title: 'Graph 1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
            { path: 'promises', component: PromiseComponent, data: { title: 'Promises' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
            { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
            //maintenances
            { path: 'users', component: UsersComponent, data: { title: 'App Users' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors' } },
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }