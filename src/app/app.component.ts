import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpRequestsService } from './HttpRequests.service';
import { WalletService } from './Wallet/Wallet.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  width: number = window.screen.width;
  selected?: string;

  httpService = inject(HttpRequestsService);
  walletService = inject(WalletService);

  isAuthenticated = this.httpService.isAuthenticated;

  changeSelected(selected: string){
    this.selected = selected;

    if(this.width < 600){
      this.toggleSidebar();
    }
  }

  toggleSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('d-none');

    if(this.width > 700){
      const main_div = document.querySelector('.main-grid');
      main_div?.classList.toggle('d-grid');
    }
  }

  ngOnInit(){
    this.selected = window.location.pathname.substring(1);
    this.walletService.setTotalAmount();
    this.walletService.setTotalIncomes();
    this.walletService.setTotalExpenses();

    if(this.selected == 'add-expense'){
      this.selected = 'wallet';
    }
  }
}