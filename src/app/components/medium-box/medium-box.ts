import { Component, input } from '@angular/core';
import { LowerCasePipe, NgClass } from "@angular/common";

@Component({
  selector: 'app-medium-box',
  imports: [LowerCasePipe, NgClass],
  templateUrl: './medium-box.html',
  styleUrl: './medium-box.less'
})
export class MediumBox {
  readonly title = input.required<string>();
  readonly value = input<number>(0);
  readonly icon = input.required<string>();
  readonly iconColor = input<string>();
  readonly iconBgColor = input<string>();
  readonly todayValue = input<number>(0);
  readonly badgeBgColor = input<string>();
  readonly badgeTextColor = input<string>();
}
