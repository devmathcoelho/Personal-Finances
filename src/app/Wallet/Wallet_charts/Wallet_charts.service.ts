import { inject, Injectable } from '@angular/core';
import { Expense } from '../../../models/Expense';
import { HttpRequestsService } from '../../HttpRequests.service';
import { WalletChart } from '../../../models/WalletChart';

@Injectable({
  providedIn: 'root'
})
export class Wallet_chartsService {
  httpService = inject(HttpRequestsService)

  data: Array<WalletChart> = [];

  nameHomeChart: Array<string> = []
  dataHomeChart: Array<number> = []

  formData: Array<Expense> = [];
  monthToday: number = new Date().getMonth();

  constructor() { 
    this.formData = this.httpService.userAuth!.expenses
    this.reloadCategoryValue();
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
    for (let i = 0; i < this.data.length; i++) {
        if(i == categoryIndex){

          if(this.data[i].data[month] == undefined){
            this.data[i].data[month] = 0
          }
          this.data[i].data[month] += value;
          break;
        }}
  }

  // Call addDataValue and parse parameters
  setData(value: number, date: string, categoryIndex: number){
    let dateMonth = new Date(date).getMonth();

    if(dateMonth < 0 || dateMonth > 11){
      return console.log('The month must be between 1 and 12');
    }
    
   this.addDataValue(value, dateMonth, categoryIndex);
  }

  // Gets the name and value of categories
  reloadCategoryValue(){
    const categoriesCombined = this.combineCategoryArray();

    this.data = [];
    this.nameHomeChart = []
    this.dataHomeChart = []

    for (let i = 0; i < categoriesCombined.length; i++) {
      this.data.push({
        label: categoriesCombined[i].name,
        data: new Array(12),
        borderWidth: i === 0 ? 2 : 1
      });
      
      this.nameHomeChart.push(categoriesCombined[i].name);
      this.dataHomeChart.push(categoriesCombined[i].value);
    }
    
    this.httpService.userAuth!.expenses.forEach(e => {
      this.setData(e.value, e.date, this.categoryToIndex(categoriesCombined, e.category));
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