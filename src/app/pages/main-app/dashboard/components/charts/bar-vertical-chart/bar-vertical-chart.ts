import { Component, signal } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-vertical-chart',
  imports: [NgxChartsModule],
  templateUrl: './bar-vertical-chart.html',
  styleUrl: './bar-vertical-chart.less'
})
export class BarVerticalChart {
  
  // data goes here
  data = [
    {
      "name": "China",
      "value": 2243772
    },
    {
      "name": "USA",
      "value": 1126000
    },
    {
      "name": "Norway",
      "value": 296215
    },
    {
      "name": "Japan",
      "value": 257363
    },
    {
      "name": "Germany",
      "value": 196750
    },
    {
      "name": "France",
      "value": 204617
    }
  ];
  //view: [number, number] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;

  colorScheme = signal<any>({
    name: 'Sales report',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  })

  //pie
  showLabels = true;

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
