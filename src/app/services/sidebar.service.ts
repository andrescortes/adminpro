import { Injectable, OnInit } from '@angular/core';
import { IMenu } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {
  menuItems!: IMenu[];

  constructor() { }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    const menu = localStorage.getItem('menu');
    if (menu) {
      this.menuItems = JSON.parse(menu);
    }
  }
}
