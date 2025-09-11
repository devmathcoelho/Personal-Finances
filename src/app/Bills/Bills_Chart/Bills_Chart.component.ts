import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { BillsService } from '../../Home/Bills.service';

@Component({
  selector: 'app-Bills_Chart',
  templateUrl: './Bills_Chart.component.html',
  styleUrls: ['./Bills_Chart.component.css'],
  imports: [BaseChartDirective]
})
export class Bills_ChartComponent {
  billsService = inject(BillsService)

  barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
             'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Bills',
      data: this.billsService.billsChart,
      borderWidth: 2
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