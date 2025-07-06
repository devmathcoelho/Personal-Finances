import { Component } from '@angular/core';

@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css']
})
export class WalletComponent {
  expense = {
    name: 'Carro',
    amount: 100,
    date: Date.now()
  };

  expenses_total_month = this.ExpenseCalc();

  ExpenseCalc(){
    let total = 0;
    total += this.expense.amount;

    return total;
  }
}