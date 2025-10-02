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

  dateNow: Date = new Date();
  dateMonth: number = 0;
  hasName: boolean = true;
  router: Router = inject(Router);

  addData(){
    // Get the reference of the form elements
    this.expense.name = (document.getElementById('name') as HTMLInputElement).value;
    this.expense.category = (document.getElementById('category') as HTMLInputElement).value;
    this.expense.value = Number((document.getElementById('amount') as HTMLInputElement).value);
    this.expense.date = (document.getElementById('date') as HTMLInputElement).value;
    this.expense.userId = this.httpService.userAuth?.id

    if(this.expense.date == '' || this.expense.date == null){ {
      this.expense.date = this.dateFormat.formatDate(this.dateNow);
    }

    if(this.expense.name == '' || this.expense.value == 0){
      this.hasName = false;
      this.expense.category = '';
    }

    if(this.expense.category == 'Income'){
      this.httpService.setRevenue(this.expense);

      // Send date to Chart
      const dateFormated = this.dateFormat.formatStringToDate(this.expense.date);
      this.dateMonth = dateFormated!.getMonth();
      this.chartService.setData(this.expense.value, this.dateMonth, this.expense.category)

      this.router.navigate(['/wallet']);

    } else if (this.expense.category != '') {
      this.httpService.setExpense(this.expense);

      // Send date to Chart
      const dateFormated = this.dateFormat.formatStringToDate(this.expense.date);
      this.dateMonth = dateFormated!.getMonth();
      this.chartService.setData(this.expense.value, this.dateMonth, this.expense.category)

      this.router.navigate(['/wallet']);
    }
  }
}}