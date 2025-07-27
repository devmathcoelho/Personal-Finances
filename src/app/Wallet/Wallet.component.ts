import { Component, inject } from '@angular/core';
import { DateFormatService } from '../DateFormat.service';
import { RouterLink } from '@angular/router';
import { Wallet_chartsService } from './Wallet_charts/Wallet_charts.service';
import { Wallet_chartsComponent } from "./Wallet_charts/Wallet_charts.component";
import { WalletService } from './Wallet.service';
@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  host: {
    class: 'wallet-main'
  },
  imports: [RouterLink, Wallet_chartsComponent]
})
export class WalletComponent {
  chartService = inject(Wallet_chartsService);
  dateFormat = inject(DateFormatService);
  walletService = inject(WalletService);

  width: number = window.screen.width;

  constructor(){
    // totalWallet receives the array of formData
    this.walletService.totalWallet = this.chartService.getFormData();
    this.walletService.totalWallet = this.sortWalletByDate(this.walletService.totalWallet);
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