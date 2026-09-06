import { Component, signal } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.less'
})
export class PieChart {
  data: any[] = [ {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }]
  //view: [number, number] = [600, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme = signal<any>({
    name: 'Sales report',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  })

  constructor() {
  }
  ngOnInit(): void {
     this.colorScheme.update(scheme =>{
      return{
        ...scheme,
        domain: [
          this.getCSSVairable('--primary-color'),
          this.getCSSVairable('--warning-color'),
          this.getCSSVairable('--secondary-color'),
          this.getCSSVairable('--success-color')
        ]
      }
     })
  }

  getCSSVairable(name: string): string{
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
