import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpRequestsService } from './Home/HttpRequests.service';
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

  isAuthenticated = this.httpService.isAuthenticated;

  changeSelected(selected: string){
    this.selected = selected;
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

    if(this.selected == 'add-expense-revenue'){
      this.selected = 'wallet';
    }
  }
}