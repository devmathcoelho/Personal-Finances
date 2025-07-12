import { Component, inject } from '@angular/core';
import { Expense, Revenue } from '../Expense';
import { DateFormatService } from '../DateFormat.service';
import { Wallet_chartsComponent } from './Wallet_charts/Wallet_charts.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  host: {
    class: 'wallet-main'
  },
  imports: [Wallet_chartsComponent, RouterLink]
})
export class WalletComponent {
  expensesArray: Array<Expense> = [];
  revenuesArray: Array<Revenue> = [];
  totalWallet: Array<any> = [];

  expenses_total_month: number = 0;
  revenues_total_month: number = 0;

  dateFormat = inject(DateFormatService)
  width: number = window.screen.width;

  expense: Expense = {
    name: 'Carro',
    amount: -100,
    category: 'Transportation',
    date: this.dateFormat.formatDate(new Date(2025, 7, 2))
  };

  revenue: Revenue = {
    name: 'McDonalds',
    amount: 100,
    category: 'Food',
    date: this.dateFormat.formatDate(new Date(2025, 7, 10))
  };

  constructor(){
    for (let index = 0; index < 10; index++) {
      
      this.expensesArray.push(this.expense);
      this.revenuesArray.push(this.revenue);
    }

    // totalWallet receives the array of expenses and revenues
    this.totalWallet = this.expensesArray.concat(this.revenuesArray);
    this.totalWallet = this.sortWalletByDate(this.totalWallet);

    this.expenses_total_month = this.expenseCalc();
    this.revenues_total_month = this.revenueCalc();
  }

  checkAmount(amount: number): boolean {
    if (amount < 0) {
      return false;
    } else {
      return true;
    }
  }

  // Returns the total amount of expenses
  expenseCalc(){
    let total = 0;
    
    total = this.expensesArray.reduce((total, expense) => total + expense.amount, 0);

    return total;
  }

  // Returns the total amount of revenue
  revenueCalc(){
    let total = 0;
    
    total = this.revenuesArray.reduce((total, revenue) => total + revenue.amount, 0);

    return total;
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