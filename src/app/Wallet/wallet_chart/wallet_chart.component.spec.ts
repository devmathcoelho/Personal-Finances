/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Wallet_graphComponent } from './wallet_chart.component';

describe('Wallet_graphComponent', () => {
  let component: Wallet_graphComponent;
  let fixture: ComponentFixture<Wallet_graphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wallet_graphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wallet_graphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
