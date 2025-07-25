import { Injectable } from '@angular/core';
import { Expense } from '../Expense';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  totalWallet: Array<Expense> = [];
}
