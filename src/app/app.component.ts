import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpRequestsService } from './HttpRequests.service';
import { WalletService } from './Wallet/Wallet.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  width: number = window.screen.width;
  selected?: string;

  httpService = inject(HttpRequestsService);
  walletService = inject(WalletService);

  isAuthenticated = this.httpService.isAuthenticated;
  router = inject(Router);

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

  async getUser(){
    this.httpService.userAuth = await this.httpService.getUserData(this.httpService.userGetName);

    this.walletService.setTotalWallet();
    this.router.navigate(['/dashboard']);
  }
  
  ngOnInit(){
    this.selected = window.location.pathname.substring(1);
    
    this.getUser();
    
    if(this.selected == 'add-expense'){
      this.selected = 'wallet';
    }
  }
}