import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Wallet_chartsService } from './Wallet_charts.service';

@Component({
  selector: 'app-wallet_chart',
  templateUrl: './wallet_charts.component.html',
  imports: [BaseChartDirective],
  styleUrls: ['./wallet_charts.component.css']
})
export class Wallet_chartsComponent {

  chartService = inject(Wallet_chartsService);

  barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Income',
      data: this.chartService.Incoming,
      borderWidth: 2
    },
    {
      label: 'Bills',
      data: this.chartService.Bills,
      borderWidth: 1
    },
    {
      label: 'Food',
      data: this.chartService.Food,
      borderWidth: 1
    },
    {
      label: 'Transportation',
      data: this.chartService.Transportation,
      borderWidth: 1
    },
    {
      label: 'Credit Card',
      data: this.chartService.CreditCard,
      borderWidth: 1
    },
    {
      label: 'Others',
      data: this.chartService.Others,
      borderWidth: 1
    }]
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
