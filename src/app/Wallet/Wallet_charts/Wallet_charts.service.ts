import { inject, Injectable } from '@angular/core';
import { Expense } from '../../Expense';
import { HttpRequestsService } from '../../HttpRequests.service';

@Injectable({
  providedIn: 'root'
})
export class Wallet_chartsService {
  httpService = inject(HttpRequestsService)

  Income: Array<number> = []
  Bills: Array<number> = []
  Food: Array<number> = []
  Transportation: Array<number> = []
  CreditCard: Array<number> = []
  Others: Array<number> = []

  data: Array<Array<number>> = [this.Income, this.Bills, this.Food, 
    this.Transportation, this.CreditCard, this.Others];

  dataHomeChart: Array<number> = [5, 5, 5, 5, 5 ,5]

  formData: Array<Expense> = [];

  constructor() { 
    this.formData = this.httpService.userAuth!.expenses
  }
  
  // Verify category name and return index
  setCategoryToIndex(category: string) :number {
    let categoryIndex: number

    switch(category){
      case 'Income':
        categoryIndex = 0
        break
      case 'Bills':
        categoryIndex = 1
        break
      case 'Food':
        categoryIndex = 2
        break
      case 'Transportation':
        categoryIndex = 3
        break
      case 'Credit Card':
        categoryIndex = 4
        break
      case 'Others':
        categoryIndex = 5
        break
      default: 
        console.log('Category not found');
        return -1
      }
      return categoryIndex;
  }

  // Add value data Array on corresponding index
  addDataValue(value: number, category: number, month: number){
    for (let i = 0; i < this.data.length; i++) {
        if(i == category){

          if(this.data[i][month] == undefined){
            this.data[i][month] = 0
          }

          this.data[i][month] += value;
          break;
        }}
  }

  // Call addDataValue and parse parameters
  setData(value: number, month: number, category: string){
    if(month < 0 || month > 11){
      return console.log('The month must be between 1 and 12');
    }

    const categoryIndex: number = this.setCategoryToIndex(category);
    this.addDataValue(value, categoryIndex, month);
  }

  // Create new category
  setCategory(category: Array<number>){
    this.data.push(category)
    console.log(this.data);
  }

  removeCategory(category: Array<number>){
    for (let i = 0; i < this.data.length; i++) {
      if(this.data[i] == category){
        this.data.splice(i, 1)
      } else {
        console.log('Category not found');
      }
    }
  }

}