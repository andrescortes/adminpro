import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css',
  ]
})
export class ProgressComponent {
  progress: number = 30;
  progress2: number = 55;

  get progressString(): string {
    return `${this.progress}%`;
  }

  get progressString2(): string {
    return `${this.progress2}%`;
  }

  changeValue(value: number) {
    this.progress = value;
  }

  changeValue2(value: number) {
    this.progress2 = value;
  }

}
