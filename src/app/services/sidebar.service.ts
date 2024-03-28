import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menuItems: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Principal', url: '/dashboard' },
        { title: 'Progress', url: 'progress' },
        { title: 'Promises', url: 'promises' },
        { title: 'Graph1', url: 'graph1' },
        { title: 'RxJs', url: 'rxjs' },
      ]
    },
    {
      title: 'Maintenances',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' },
      ]
    }
  ];

  constructor() { }
}
