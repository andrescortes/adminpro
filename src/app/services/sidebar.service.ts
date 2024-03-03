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
        { title: 'Main', url: '/' },
        { title: 'Progress', url: 'progress' },
        { title: 'Graph1', url: 'graph1' },
      ]
    },
  ];

  constructor() {
    console.log('SidebarService constructor');

  }
}
