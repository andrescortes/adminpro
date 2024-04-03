import { Component, OnInit } from '@angular/core';
import { SettingsService, SidebarService } from '../services';

declare function customFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  constructor(
    private readonly sideBarService: SidebarService,
    private readonly settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    customFunctions();
    this.sideBarService.loadMenu();
    this.settingsService.checkCurrentTheme();
  }
}
