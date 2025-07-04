import { Component, inject } from '@angular/core';
import { HttpRequestsService } from './HttpRequests.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  httpRequest: HttpRequestsService = inject(HttpRequestsService);

  money = this.httpRequest.getMoney()
  expense_month_total = this.httpRequest.getExpensesMonth();
}