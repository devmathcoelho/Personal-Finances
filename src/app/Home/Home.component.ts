import { Component, inject } from '@angular/core';
import { HttpRequestsService } from './HttpRequests.service';
import { WalletService } from '../Wallet/Wallet.service';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { BillsService } from './Bills.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  imports: [RouterLink],
  styleUrls: ['./Home.component.css']
})
export class HomeComponent {
  httpRequest = inject(HttpRequestsService);
  walletService = inject(WalletService);
  app = inject(AppComponent);
  billsService = inject(BillsService);

  changeSelected(selected: string) {
    this.app.changeSelected(selected);
  }
}