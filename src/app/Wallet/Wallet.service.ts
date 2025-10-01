import { inject, Injectable } from '@angular/core';
import { Expense } from '../Expense';
import { HttpRequestsService } from '../HttpRequests.service';
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  httpService = inject(HttpRequestsService)

  private totalAmount: number = 0;
  private totalIncomes: number = 0;
  private totalExpenses: number = 0;
  totalWallet: Array<Expense> = [];
  
  getUserAmounts() {
    this.totalAmount = this.httpService.userAuth!.totalBalance;
    this.totalIncomes = this.httpService.userAuth!.totalRevenue;
    this.totalExpenses = this.httpService.userAuth!.totalExpense;
    
    return { totalAmount: this.totalAmount, totalIncomes: this.totalIncomes, totalExpenses: this.totalExpenses };
  }
  
  setTotalWallet() {
  // totalWallet receives the array of formData
    this.totalWallet = this.httpService.userAuth!.expenses;
    this.totalWallet = this.sortArrayByDate(this.totalWallet);
  }

  // Sorts the wallet by date
  sortArrayByDate(Array: Array<any>) {
      return Array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
