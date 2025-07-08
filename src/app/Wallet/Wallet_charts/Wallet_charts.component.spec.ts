/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Wallet_chartsComponent } from './Wallet_charts.component';

describe('Wallet_chartsComponent', () => {
  let component: Wallet_chartsComponent;
  let fixture: ComponentFixture<Wallet_chartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wallet_chartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wallet_chartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
