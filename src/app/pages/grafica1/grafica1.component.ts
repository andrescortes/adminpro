import { Component } from '@angular/core';
import { DataChartType, DataCharts } from '../../shared/models/data-charts.model';
import { ColorChartType, ColorsChart } from '../../shared/models/colors-chart.model';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
  titles: string[] = [ 'Sales', 'Customers', 'Orders', 'Products' ];
  data: DataCharts;
  colors: ColorsChart;

  constructor() {
    this.data = {
      dataCharts: [
        [ this.generateData() ],
        [ this.generateData() ],
        [ this.generateData() ]
      ]
    };
    this.colors = {
      colorsType: [
        [ this.generadorColoresRandom() ],
        [ this.generadorColoresRandom() ],
        [ this.generadorColoresRandom() ]
      ]
    }
  }

  generateData(): DataChartType {
    return Array
      .from({ length: 3 }, () => Array
        .from({ length: 3 }, () => Math.floor(Math.random() * 900)));
  }

  generarColorAleatorio(): string {
    const letras: string = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
      color += letras[ Math.floor(Math.random() * 16) ];
    }
    if( color === '#FFFFFF' ) {
      color = this.generarColorAleatorio();
    }
    return color;
  };

  generadorColoresRandom(): ColorChartType {
    return Array.from({ length: 3 },
      () => Array.from({ length: 3 },
        () => this.generarColorAleatorio()));
  }
}
