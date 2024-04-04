import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { authGuard } from '../guards';
import { authLoadGuard } from '../guards/auth-load.guard';


export const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [
            authGuard
        ],
        canMatch: [
            authLoadGuard
        ],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }