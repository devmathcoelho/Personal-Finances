import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Wallet_chartsService } from '../Wallet_charts/Wallet_charts.service';
import { DateFormatService } from '../../DateFormat.service';
import { WalletService } from '../Wallet.service';
import { Expense } from '../../../models/Expense';
import { HttpRequestsService } from '../../HttpRequests.service';
import { Category } from '../../../models/Category';

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

  category: Category = {
    id: undefined,
    name: '',
    value: 0,
    month: 0,
    userId: undefined
  }
  
  expense: Expense = { 
    id: undefined,
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
    
    this.category.name = this.expense.category
    this.category.value = this.expense.value
    this.category.month = this.dateFormat.formatStringToDate(this.expense.date).getMonth()
    this.category.userId = this.httpService.userAuth?.id

    if(this.expense.date == '' || this.expense.date == null){
      this.expense.date = this.dateFormat.formatDate(this.dateNow);
    }

    if(this.expense.name == '' || this.expense.value == 0){
      this.hasName = false;
      return
    }

    this.addToDatabase();
  }

  async addToDatabase(){
    await this.httpService.setRevenue(this.expense);

    const requestReturn = await this.httpService.setCategory(this.category);

    if (!requestReturn) {
      await this.httpService.addToCategory(this.category);
    }

    this.returnToWallet();
  }

  returnToWallet(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/wallet');
    });
  }
}