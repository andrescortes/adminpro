import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './maintenances/users/users.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './maintenances/doctors/doctor/doctor.component';



@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    DoctorsComponent,
    Grafica1Component,
    HospitalsComponent,
    PagesComponent,
    ProfileComponent,
    ProgressComponent,
    PromiseComponent,
    RxjsComponent,
    UsersComponent,
    DoctorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Custom Modules
    ComponentsModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
  ]
})
export class PagesModule { }
