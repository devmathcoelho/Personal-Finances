import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { HomeComponent } from './Home/Home.component';
import { WalletComponent } from './Wallet/Wallet.component';
import { CreateExpenseComponent } from './Wallet/CreateExpense/CreateExpense.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    },
    {
        path: 'add-expense-revenue',
        component: CreateExpenseComponent
    }
];
