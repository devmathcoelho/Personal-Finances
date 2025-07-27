import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Wallet_chartsService } from '../Wallet_charts/Wallet_charts.service';
import { DateFormatService } from '../../DateFormat.service';
import { WalletService } from '../Wallet.service';

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
  name?: string;
  category?: string;
  value?: number;
  date?: string; 

  chartService = inject(Wallet_chartsService)
  walletService = inject(WalletService)
  dateFormat = inject(DateFormatService)

  dateNow?: Date;
  hasName: boolean = false;

  addData(){
    this.dateNow = new Date();

    // Get the reference of the form elements
    this.name = (document.getElementById('name') as HTMLInputElement).value;
    this.category = (document.getElementById('category') as HTMLInputElement).value;
    this.value = Number((document.getElementById('amount') as HTMLInputElement).value);
    this.date = (document.getElementById('date') as HTMLInputElement).value;

    if(this.name == '' || this.value == 0){
      let button = document.getElementById('submitButton') as HTMLButtonElement;

      button.disabled = true;
      this.hasName = true;
      return
    }
    
    // IF date is not empty convert to the right format
    // ELSE set the date to the current date
    if(this.date !== ''){
      let dateFormated = this.dateFormat.formatStringToDate(this.date)

      dateFormated.setDate(dateFormated.getDate() + 1);
      
      let dateMonth = this.dateFormat.getMonth(dateFormated);
      this.date = this.dateFormat.formatDate(dateFormated);

      this.chartService.setData(this.value, dateMonth, this.category);
      this.chartService.setFormData(this.name, this.value, this.category, this.date);

      this.walletService.setTotalAmount();
      this.walletService.setTotalIncomes();
      this.walletService.setTotalExpenses();
      
    } else {
      let dateMonth = this.dateFormat.getMonth(this.dateNow);

      this.date = this.dateFormat.formatDate(this.dateNow);

      this.chartService.setData(this.value, dateMonth, this.category);
      this.chartService.setFormData(this.name, this.value, this.category, this.date);
      
      this.walletService.setTotalAmount();
      this.walletService.setTotalIncomes();
      this.walletService.setTotalExpenses();
    }
  }
}