import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType, ChartOptions, ChartEvent, ActiveElement, Chart } from 'chart.js';
import { DataChartType } from '../../shared/models/data-charts.model';
import { ColorChartType } from '../../shared/models/colors-chart.model';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrl: './dona.component.css'
})
export class DonaComponent implements OnChanges {
  @Input() title: string = 'Sales';
  @Input({ required: true }) data: DataChartType = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
  ];
  @Input() colors: ColorChartType = [
    [ '#6857E6', '#009FEE', '#F02059' ],
    [ '#6857E6', '#009FEE', '#F02059' ],
    [ '#6857E6', '#009FEE', '#F02059' ],
  ]

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data[ 0 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        spacing: 10
      },
      {
        data: this.data[ 1 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        transitions: {
          mode: {
            animation: {
              duration: 2000,
              easing: 'easeOutElastic',
              loop: true,
              delay: 1000
            }
          }
        },
        type: 'doughnut',
        label: 'Dataset 2',
        weight: 1,
      },
      {
        data: this.data[ 2 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    // onHover(event: ChartEvent, elements: ActiveElement[], chart: Chart): void {
    //   console.log({
    //     event,
    //     elements,
    //     chart
    //   });
    // },
    onClick(event: ChartEvent, elements: ActiveElement[], chart: Chart): void {
      console.log({
        event,
        elements,
        chart
      })
    },
    color: '#6857E6',
    plugins: {
      title: {
        display: true,
        text: 'Doughnut Chart',
        color: '#333',
        font: {
          size: 20
        },
        position: 'top'
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data: DataChartType = changes?.[ 'data' ]?.currentValue;
    const colorsCurrent: ColorChartType = changes?.[ 'colors' ]?.currentValue;
    if (data && colorsCurrent) {
      this.data = data;
      this.colors = colorsCurrent;
      this.doughnutChartData = {
        ...this.doughnutChartData,
        datasets: [
          {
            ...this.doughnutChartData.datasets[ 0 ],
            data: this.data[ 0 ],
            backgroundColor: this.colors[ 0 ]
          },
          {
            ...this.doughnutChartData.datasets[ 1 ],
            data: this.data[ 1 ],
            backgroundColor: this.colors[ 1 ]
          },
          {
            ...this.doughnutChartData.datasets[ 2 ],
            data: this.data[ 2 ],
            backgroundColor: this.colors[ 2 ]
          }
        ]
      }
    }
  }
  // events
  public chartClicked({ event, active, }: { event: ChartEvent; active: object[]; }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active, }: { event: ChartEvent; active: object[]; }): void {
    console.log(event, active);
  }
}
