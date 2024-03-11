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
  ];

  constructor() { }
}
