import { Component, inject } from '@angular/core';
import { DateFormatService } from '../DateFormat.service';
import { RouterLink } from '@angular/router';
import { Wallet_chartsService } from './Wallet_charts/Wallet_charts.service';
import { Wallet_chartsComponent } from "./Wallet_charts/Wallet_charts.component";
import { WalletService } from './Wallet.service';
import { HttpRequestsService } from '../HttpRequests.service';
import { User } from '../User';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-Wallet',
  templateUrl: './Wallet.component.html',
  styleUrls: ['./Wallet.component.css'],
  host: {
    class: 'wallet-main'
  },
  imports: [RouterLink, Wallet_chartsComponent, AsyncPipe]
})
export class WalletComponent {
  chartService = inject(Wallet_chartsService);
  dateFormat = inject(DateFormatService);
  walletService = inject(WalletService);
  httpService = inject(HttpRequestsService)

  width: number = window.screen.width;

  checkAmount(amount: number): boolean {
    if (amount < 0) {
      return false;
    } else {
      return true;
    }
  }
}