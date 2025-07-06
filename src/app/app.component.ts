import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpRequestsService } from './Home/HttpRequests.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client_Side';
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
  }

}
