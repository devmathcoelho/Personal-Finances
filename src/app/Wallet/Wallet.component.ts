import { Component, inject } from '@angular/core';
import { DateFormatService } from '../DateFormat.service';
import { RouterLink } from '@angular/router';
import { Wallet_chartsService } from './Wallet_charts/Wallet_charts.service';
import { Wallet_chartsComponent } from "./Wallet_charts/Wallet_charts.component";
import { WalletService } from './Wallet.service';
import { HttpRequestsService } from '../HttpRequests.service';
import { AsyncPipe } from '@angular/common';
import { Expense } from '../../models/Expense';
@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  host: {
    class: 'wallet-main'
  },
  imports: [RouterLink, Wallet_chartsComponent, AsyncPipe]
})
export class WalletComponent {
  chartService = inject(Wallet_chartsService);
  dateFormat = inject(DateFormatService);
  walletService = inject(WalletService);
  httpService = inject(HttpRequestsService)

  width: number = window.screen.width;

  constructor() { 
    this.chartService.reloadCategoryValue();
  }

  checkAmount(amount: number): boolean {
    if (amount < 0) {
      return false;
    } else {
      return true;
    }
  }

  async deleteExpenseAndCategory(expense: Expense){
    await this.httpService.deleteExpense(expense)
    const requestReturn = await this.httpService.removeFromCategory(new Date(expense.date).getMonth(), expense.value);
    if(!requestReturn){
      await this.httpService.removeCategory(expense.category);
    }
    this.chartService.reloadCategoryValue();
  }
}