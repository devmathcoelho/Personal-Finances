import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/User';
import { Expense } from '../models/Expense';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private ApiUrl = 'https://www.simplefinances.somee.com/';
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
      return false
    }
  }

  async addToCategory(category: Category){
    try{
      await firstValueFrom(this.http.put(
      `${this.ApiUrl}/category/${this.userGetName}/${category.month}/${category.value}/add`, 
        { month: category.month, value: category.value, user: this.userGetName },
        { headers: { 'Content-Type': 'application/json' } }
      ));

      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);
      return true;
    } catch (err){
      console.error('Error updating category', err);
      return false;
    }
  }  

  async removeFromCategory(month: number, value: number){
    try{
      await firstValueFrom(this.http.put(`${this.ApiUrl}/category/${this.userGetName}/${month}/${value}/remove`,  
        { month: month, value: value, user: this.userGetName },
        { headers: { 'Content-Type': 'application/json' } }
      ));

      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);
      return true;
    } catch (err){
      console.error('Error updating category', err);
      return false;
    }
  }

  async removeCategory(category: string) {
    try {
      await firstValueFrom(this.http.delete(`${this.ApiUrl}/category/${category}`, 
        { params: { user: this.userGetName, category: category } }));

      const user = await this.getUserData(this.userGetName); // Atualiza userAuth
      this.userSubject.next(user);
      return true
    } catch (err) {
      console.error('Error deleting category', err);
      return false
    }
  }
}