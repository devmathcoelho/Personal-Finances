import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth() + 1;
    const monthString = month.toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${monthString}/${year}`;
  }

  formatStringToDate(date: string){
    let dateParsed = Date.parse(date);
    let dateFormated = new Date(dateParsed);
    
    return dateFormated
  }
  
  getMonth(date: Date): string {
    const month = (date.getMonth()).toString().padStart(2, '0');

    return month
  }
}