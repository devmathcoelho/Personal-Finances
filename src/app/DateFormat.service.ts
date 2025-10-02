import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`; // ✅ ISO
  }

  formatDateWithoutYear(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth() + 1;
    const monthString = month.toString().padStart(2, '0');
  
    return `${day}/${monthString}`;
  }

  formatStringToDate(date: string): Date {
    // yyyy-mm-dd
    if (date.includes('-')) {
      const [year, month, day] = date.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

    // dd/mm/yyyy
    if (date.includes('/')) {
      const [day, month, year] = date.split('/').map(Number);
      return new Date(year, month - 1, day);
    }

    return new Date();
  }
}