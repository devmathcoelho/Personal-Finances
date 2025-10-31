import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Wallet_chartsService } from './Wallet_charts.service';

@Component({
  selector: 'app-wallet_chart',
  templateUrl: './Wallet_charts.component.html',
  imports: [BaseChartDirective],
  styleUrls: ['./Wallet_charts.component.css']
})
export class Wallet_chartsComponent {

  chartService = inject(Wallet_chartsService);

  barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],
    datasets: this.chartService.data
  };

  barChartOptions =  {
    scales: {
      y: {
              grid: {
        display: true,
        color: "#5d1840"
      }
    },
    x: {
      grid: {
        display: false
      }
    }}
  };
}