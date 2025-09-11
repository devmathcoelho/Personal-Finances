import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DateFormatService } from '../../DateFormat.service';
import { BillsService } from '../../Home/Bills.service';

@Component({
  selector: 'app-CreateBill',
  templateUrl: './CreateBill.component.html',
  styleUrls: ['./CreateBill.component.css'],
  imports: [FormsModule, RouterLink]
})
export class CreateBillComponent {

  billService = inject(BillsService);
  dateFormat = inject(DateFormatService);

  name?: string;
  value?: number;
  date?: string;

  setBill(){
    this.name = (document.getElementById('name') as HTMLInputElement).value;
    this.value = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
    this.date = (document.getElementById('date') as HTMLInputElement).value;

    if(this.date === '') {
      let dateNow = new Date()
      this.date = this.dateFormat.formatDateWithoutYear(dateNow)
    } else {
      let dateFormated = this.dateFormat.formatStringToDate(this.date)
      dateFormated.setDate(dateFormated.getDate() + 1);
      this.date = this.dateFormat.formatDateWithoutYear(dateFormated)
    }

    this.billService.setBill({
      name: this.name,
      amount: this.value,
      date: this.date,
      createdAt: new Date()
    })
  }
}
