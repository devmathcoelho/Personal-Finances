import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Wallet_chartsService } from '../Wallet_charts/Wallet_charts.service';
import { DateFormatService } from '../../DateFormat.service';

@Component({
  selector: 'app-CreateExpense',
  templateUrl: './CreateExpense.component.html',
  host: {
    class: 'm-auto'
  },
  imports: [RouterLink],
  styleUrls: ['./CreateExpense.component.css']
})
export class CreateExpenseComponent {

  chartService = inject(Wallet_chartsService)
  dateFormat = inject(DateFormatService)

  addData(){
    let name: string;
    let category: string;
    let value: number;
    let date: string;

    name = (document.getElementById('name') as HTMLInputElement).value;
    category = (document.getElementById('category') as HTMLInputElement).value;
    value = Number((document.getElementById('amount') as HTMLInputElement).value);
    date = (document.getElementById('date') as HTMLInputElement).value;

    if(name == '' || category == '' || value == 0 || date == ''){
      return;
    }

    let dateParse = Date.parse(date);
    let dateFormated = new Date(dateParse);

    let dateMonth = this.dateFormat.getMonth(dateFormated);

    this.chartService.setData(value, dateMonth, category);
  }

}