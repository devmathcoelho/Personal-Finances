import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-wallet_chart',
  templateUrl: './wallet_charts.component.html',
  imports: [BaseChartDirective],
  styleUrls: ['./wallet_charts.component.css']
})
export class Wallet_chartsComponent {

  barChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  };

  barChartOptions =  {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
