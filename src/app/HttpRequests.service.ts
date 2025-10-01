import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './User';
import { Expense } from './Expense';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private ApiUrl = 'http://simplefinances.somee.com';
  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  isAuthenticated: boolean = false;
  userAuth: User | null = null;
  userGetName: string = 'Nicoath';

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
        const user = await this.getUserData(this.userGetName);
        this.userSubject.next(user);
    } catch (err) {
      console.error('Error creating expense', err);
    }
  }

  async deleteExpense(expense: Expense){
    try{
      await firstValueFrom(this.http.delete<Expense>(`${this.ApiUrl}/expense/${expense.id}`));
      const user = await this.getUserData(this.userGetName); // busca atualizado
      this.userSubject.next(user);

    } catch (err) {
      console.error('Error deleting expense', err);
    }
  }

  async setRevenue(expense: Expense){
      try {
        await firstValueFrom(this.http.post<Expense>(`${this.ApiUrl}/expense`, expense))
        const user = await this.getUserData(this.userGetName); // busca atualizado
        this.userSubject.next(user);
    } catch (err) {
      console.error('Error creating revenue', err);
    }
  }
}
