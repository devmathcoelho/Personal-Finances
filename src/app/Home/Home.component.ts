import { Component, inject } from '@angular/core';
import { WalletService } from '../Wallet/Wallet.service';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { BillsService } from './Bills.service';
import { BaseChartDirective } from 'ng2-charts';
import { Wallet_chartsService } from '../Wallet/Wallet_charts/Wallet_charts.service';
import { ChartData, ChartOptions } from 'chart.js/auto';
import { HttpRequestsService } from '../HttpRequests.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [RouterLink, BaseChartDirective, DecimalPipe],
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  walletService = inject(WalletService);
  walletChartService = inject(Wallet_chartsService);
  httpService = inject(HttpRequestsService);
  billsService = inject(BillsService);
  app = inject(AppComponent);

  userAmounts = this.walletService.getUserAmounts();

  changeSelected(selected: string) {
    this.app.changeSelected(selected);
  }

  constructor(){
    this.walletChartService.reloadCategoryValue();
  }

  barChartData: ChartData<'pie', number[], string | string[]> = {
  labels: this.walletChartService.nameHomeChart,
  datasets: [
    {
      data: this.walletChartService.dataHomeChart,
      backgroundColor: [
        '#36A2EB',
        '#FF6384',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }
  ]
};

barChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
};

}