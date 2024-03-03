import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  constructor(private readonly settingsService: SettingsService) { }

  ngOnInit(): void {
    customFunctions();
  }
}
