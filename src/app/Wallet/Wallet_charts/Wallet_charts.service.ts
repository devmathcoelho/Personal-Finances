import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Wallet_chartsService {
  Incoming: Array<number> = []
  Bills: Array<number> = []
  Food: Array<number> = []
  Transportation: Array<number> = []
  CreditCard: Array<number> = []
  Others: Array<number> = []

  data: Array<Array<number>> = [this.Incoming, this.Bills, this.Food, 
    this.Transportation, this.CreditCard, this.Others];
  
  // Verify category name and return index
  setCategoryToIndex(category: string){
    let categoryIndex: number

    switch(category){
      case 'Incoming':
        categoryIndex = 0
        return categoryIndex;
      case 'Bills':
        categoryIndex = 1
        return categoryIndex;
      case 'Food':
        categoryIndex = 2
        return categoryIndex;
      case 'Transportation':
        categoryIndex = 3
        return categoryIndex;
      case 'Credit Card':
        categoryIndex = 4
        return categoryIndex;
      case 'Others':
        categoryIndex = 5
        return categoryIndex;
      default: 
        console.log('Category not found');
        return -1
    }
  }

  // Add value data Array on corresponding index
  addDataValue(value: number, category: number, month: number){
    for (let i = 0; i < this.data.length; i++) {
        if(i == category){

          if(this.data[i][month] == undefined){
            this.data[i][month] = 0
          }

          this.data[i][month] += value;

          console.log(this.data[i]);
          break;
        }}
  }

  // Call addDataValue and parse parameters
  setData(value: number, month: string, category: string){
    if(typeof month != 'string'){
      return console.log('The month must be a string');
    }
    if(typeof category != 'string'){
      return console.log('The category must be a string');
    }

    let monthIndex: number = Number.parseInt(month);

    if(monthIndex < 0 || monthIndex > 11){
      return console.log('The month must be between 1 and 12');
    }

    let categoryIndex: number = this.setCategoryToIndex(category);
    this.addDataValue(value, categoryIndex, monthIndex);
  }

  // Remove data from data Array
  removeData(){
    for (let i = 0; i < this.data.length; i++) {
      const dataArray = this.data[i];
      for (let index = 0; index < dataArray.length; index++) {
        dataArray[index] = 0
      }
    }
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