import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Wallet_chartsService } from '../Wallet_charts/Wallet_charts.service';
import { DateFormatService } from '../../DateFormat.service';
import { WalletService } from '../Wallet.service';
import { Expense } from '../../Expense';
import { HttpRequestsService } from '../../HttpRequests.service';

@Component({
  selector: 'app-CreateExpense',
  templateUrl: './CreateExpense.component.html',
  host: {
    class: 'm-auto'
  },
  imports: [RouterLink, FormsModule],
  styleUrls: ['./CreateExpense.component.css']
})
export class CreateExpenseComponent {
  expense: Expense = { 
    id: 0,
    name: '', 
    category: '', 
    value: 0, 
    date: '',
    userId: undefined 
  };

  chartService = inject(Wallet_chartsService)
  walletService = inject(WalletService)
  dateFormat = inject(DateFormatService)
  httpService = inject(HttpRequestsService)

  dateNow?: Date;
  hasName: boolean = false;
  router: Router = inject(Router);

  addData(){
    // Get the reference of the form elements
    this.expense.name = (document.getElementById('name') as HTMLInputElement).value;
    this.expense.category = (document.getElementById('category') as HTMLInputElement).value;
    this.expense.value = Number((document.getElementById('amount') as HTMLInputElement).value);
    this.expense.date = (document.getElementById('date') as HTMLInputElement).value;
    this.expense.userId = this.httpService.userAuth?.id

    // if(this.expense.name == '' || this.expense.value == undefined){
    //   let button = document.getElementById('submitButton') as HTMLButtonElement;

    //   button.disabled = true;
    //   this.hasName = true;
    //   return
    // }

    if(this.expense.category == 'Income'){
      this.httpService.setRevenue(this.expense);
    } else {
      this.httpService.setExpense(this.expense);
    }
  }
}