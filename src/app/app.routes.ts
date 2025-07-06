import { Routes } from '@angular/router';
import { LoginComponent } from './Login/Login.component';
import { HomeComponent } from './Home/Home.component';
import { WalletComponent } from './Wallet/Wallet.component';

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
    }
];
