import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrl: './incrementer.component.css'
})
export class IncrementerComponent implements OnInit {
  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valueOutGoing = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  changeValue(value: number): void {
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      this.valueOutGoing.emit(this.progress);
    } else if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      this.valueOutGoing.emit(this.progress);
    } else {
      this.progress = this.progress + value;
      this.valueOutGoing.emit(this.progress);
    }
  }

  onChange(value: number): void {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.valueOutGoing.emit(this.progress);
  }
}
