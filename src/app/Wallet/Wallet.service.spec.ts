/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WalletService } from './Wallet.service';

describe('Service: Wallet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletService]
    });
  });

  it('should ...', inject([WalletService], (service: WalletService) => {
    expect(service).toBeTruthy();
  }));
});
