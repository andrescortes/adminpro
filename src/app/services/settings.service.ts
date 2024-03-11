import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  linkTheme: Element | null = document?.querySelector('#theme');
  themeDefault: string = './assets/css/colors/default-dark.css';

  constructor() {
    let urlStorage = localStorage.getItem('theme') || this.themeDefault;
    this.linkTheme?.setAttribute('href', urlStorage);
  }

  changeTheme(theme: string): void {
    if (!this.linkTheme) { return; }
    const url: string = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');
    links.forEach((elem: Element) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
