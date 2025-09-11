import { inject, Injectable } from '@angular/core';
import { Bill } from './Bill';
import { DateFormatService } from '../DateFormat.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  dateFormat = inject(DateFormatService);
  bills: Array<Bill> = []
  billsChart: Array<number> = []

  // Add value data Array on corresponding index
  addDataValue(value: number, month: number){
    for (let i = 0; i < this.billsChart.length; i++) {
      if(this.billsChart[i] == month){
        this.billsChart[i] += value
        break;
      } else {
        this.billsChart[month] = 0
        break;
      }
    }
  }

  sortBillsByDate(){
    this.bills.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }

  // Add a new bill to Bills Array
  setBill(bill: Bill){
    if(bill.name === "" || bill.amount === 0 || bill.date === "") return

    const date = parseInt(bill.date.replace(/^(\d{2})\/(\d{2})$/, '$2'));
    this.addDataValue(bill.amount, date)

    this.bills.push(bill)
  }

  removeBill(bill: Bill){
    for (let i = 0; i < this.bills.length; i++) {
      // Check if the Date and Name are the same as the received
      if(bill.date === this.bills[i].date && bill.name === this.bills[i].name){
        this.bills.splice(i, 1)
      }
    }
  }

  constructor() {
    this.sortBillsByDate()
   }
}