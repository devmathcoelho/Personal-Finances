import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  getMoney() {
    return 200;
  }

  getExpensesMonth(){
    return 100;
  }

  setExpense(){
    return;
  }
}
