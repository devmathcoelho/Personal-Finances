import { Component, inject } from '@angular/core';
import { Expense } from '../Expense';
import { DateFormatService } from '../DateFormat.service';
import { RouterLink } from '@angular/router';
import { Wallet_chartsService } from './Wallet_charts/Wallet_charts.service';
@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  host: {
    class: 'wallet-main'
  },
  imports: [RouterLink]
})
export class WalletComponent {
  chartService = inject(Wallet_chartsService);
  dateFormat = inject(DateFormatService)
  width: number = window.screen.width;

  totalWallet: Array<Expense> = [];

  constructor(){
    // totalWallet receives the array of formData
    this.totalWallet = this.chartService.getFormData();
    this.totalWallet = this.sortWalletByDate(this.totalWallet);
  }

  checkAmount(amount: number): boolean {
    if (amount < 0) {
      return false;
    } else {
      return true;
    }
  }

  // Sorts the wallet by date
  sortWalletByDate(totalWallet: any[]) {
      return totalWallet.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
}