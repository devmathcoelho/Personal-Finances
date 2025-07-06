import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  isAuthenticated: boolean = false


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
