import { inject, Injectable } from '@angular/core';
import { Bill } from './Bill';
import { DateFormatService } from '../DateFormat.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  dateFormat = inject(DateFormatService);
  bills: Array<Bill> = []

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