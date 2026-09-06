import { Component } from '@angular/core';
import { Users } from "../users/users";
import { PieChart } from "./components/charts/pie-chart/pie-chart";
import { BarVerticalChart } from "./components/charts/bar-vertical-chart/bar-vertical-chart";
import { MediumBox } from "../../../components/medium-box/medium-box";


@Component({
  selector: 'app-dashboard',
  //imports: [Users, PieChart, BarVerticalChart, MediumBox],
  imports: [MediumBox],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.less'
})
export class Dashboard {

}
