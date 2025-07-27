import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { HomeComponent } from './Home/Home.component';
import { WalletComponent } from './Wallet/Wallet.component';
import { CreateExpenseComponent } from './Wallet/CreateExpense/CreateExpense.component';
import { HelpComponent } from './Help/Help.component';
import { SettingsComponent } from './Settings/Settings.component';
import { CreateBillComponent } from './Home/CreateBill/CreateBill.component';

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
        path: 'dashboard',
        component: HomeComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    },
    {
        path: 'help',
        component: HelpComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'add-expense',
        component: CreateExpenseComponent
    },
    {
        path: 'add-bill',
        component: CreateBillComponent
    }
];
