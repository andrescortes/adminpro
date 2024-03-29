import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards';
import { ProfileComponent } from './profile/profile.component';

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
            { path: 'profile', component: ProfileComponent , data: { title: 'Profile' } },
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }