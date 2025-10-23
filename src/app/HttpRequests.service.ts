import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './User';
import { Expense } from './Expense';
import { Category } from './Category';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private ApiUrl = 'https://localhost:7108';
  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isAuthenticated: boolean = false;
  userAuth: User | null = null;
  userGetName: string = 'Alisson';

  constructor() {
    this.user$.pipe(
      tap(u => {
        this.userAuth = u;
      })
    ).subscribe();
  }
  
  getUserData(name: string): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`${this.ApiUrl}/users/${name}`).pipe(
        tap(user => this.userSubject.next(user))
      )
    );    
  }

  async setExpense(expense: Expense){
      try {
        await firstValueFrom(this.http.post<Expense>(`${this.ApiUrl}/expense`, expense))
        const user = await this.getUserData(this.userGetName); // Atualiza userAuth
        this.userSubject.next(user);
    } catch (err) {
      console.error('Error creating expense', err);
    }
  }

  async deleteExpense(expense: Expense){
    try{
      await firstValueFrom(this.http.delete<Expense>(`${this.ApiUrl}/expense/${expense.id}`));
      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);

    } catch (err) {
      console.error('Error deleting expense', err);
    }
  }

  async setRevenue(expense: Expense){
      try {
        await firstValueFrom(this.http.post<Expense>(`${this.ApiUrl}/expense`, expense))
        const user = await this.getUserData(this.userGetName); // Atualiza userAuth
        this.userSubject.next(user);
    } catch (err) {
      console.error('Error creating revenue', err);
    }
  }

  async setCategory(category: Category) {
    try {
      await firstValueFrom(this.http.post<Category>(`${this.ApiUrl}/category`, category))
      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);

      return true;
    } catch (err) {
      console.error('Error creating category', err);
      return null
    }
  }

  async putCategory(category: Category){
    try{
      await firstValueFrom(this.http.put<Category>(
      `${this.ApiUrl}/${category.name}/${category.month}/${category.userId}`, category));

      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);

      return true;
    } catch (err){
      console.error('Error updating category', err);
      return null;
    }
  }  

  async editCategory(category: Category){
    try{
      await firstValueFrom(this.http.put<Category>(`${this.ApiUrl}/${category.name}/${category.userId}`, category));
      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);

      return true;
    } catch (err){
      console.error('Error updating category', err);
      return null;
    }
  }  
}