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

  nameHomeChart: Array<string> = []
  dataHomeChart: Array<number> = []

  formData: Array<Expense> = [];
  monthToday: number = new Date().getMonth();

  constructor() { 
    this.formData = this.httpService.userAuth!.expenses
  }
  
  categoryToIndex(category: Array<{name: string, value: number, userId?: number}>, name: string){
    if (!Array.isArray(category)) return -1;

    const index = category.findIndex(
      c => c.name?.trim().toLowerCase() === name?.trim().toLowerCase()
    );

    if (index === -1) console.warn(`Category "${name}" not found`, category);
    return index;

  }

  // Add value data Array on corresponding index
  addDataValue(value: number, month: number, categoryIndex: number){
    console.log(categoryIndex)

    for (let i = 0; i < this.data.length; i++) {
        if(i == categoryIndex){

          if(this.data[i][month] == undefined){
            this.data[i][month] = 0
          }

          this.data[i][month] += value;
          break;
        }}
  }

  // Call addDataValue and parse parameters
  setData(category: string, value: number, date: string, categories: Array<{name: string, value: number, userId?: number}>){
    let dateMonth = new Date(date).getMonth();

    if(dateMonth < 0 || dateMonth > 11){
      return console.log('The month must be between 1 and 12');
    }

    this.addDataValue(value, dateMonth, this.categoryToIndex(categories, category));
  }

  // Gets the name and value of categories
  reloadCategoryValue(){
    const categoriesCombined = this.combineCategoryArray();

    for (let i = 0; i < categoriesCombined.length; i++) {
      if(this.nameHomeChart[i] == undefined){
        this.nameHomeChart[i] = categoriesCombined[i].name
      }

      this.dataHomeChart[i] = categoriesCombined[i].value
    }
    
    this.httpService.userAuth!.expenses.forEach(e => {
      this.setData(e.category, e.value, e.date, categoriesCombined);
    })
  }

  combineCategoryArray(){
    const categories = this.httpService.userAuth!.categories;

    const categoriesCombined = Object.values(
      categories.reduce((acc, curr) => {
        if (!acc[curr.name]) {
          acc[curr.name] = { name: curr.name, value: 0, userId: curr.userId };
        }
        acc[curr.name].value += curr.value;
        return acc;
      }, {} as Record<string, { name: string; value: number; userId?: number }>)
    );

    return categoriesCombined
  }
}