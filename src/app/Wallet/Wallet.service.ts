import { Injectable } from '@angular/core';
import { Expense } from '../Expense';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  totalAmount: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  totalWallet: Array<Expense> = [];

  setTotalAmount() {
    for (let i = 0; i < this.totalWallet.length; i++) {
      this.totalAmount += this.totalWallet[i].amount;
    }
  }

  setTotalIncomes() {
    this.totalIncomes = 0;
    for (let i = 0; i < this.totalWallet.length; i++) {
      if (this.totalWallet[i].amount > 0) {
        this.totalIncomes += this.totalWallet[i].amount;
      }
    }
  }

  setTotalExpenses() {
    for (let i = 0; i < this.totalWallet.length; i++) {
      if (this.totalWallet[i].amount < 0) {
        this.totalExpenses += this.totalWallet[i].amount;
      }
    }

    this.totalExpenses = this.totalExpenses * -1;
  }
}
