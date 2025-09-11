import { Component, inject, OnInit } from '@angular/core';
import { BillsService } from '../Home/Bills.service';
import { Bills_ChartComponent } from "./Bills_Chart/Bills_Chart.component";

@Component({
  selector: 'app-Bills',
  templateUrl: './Bills.component.html',
  styleUrls: ['./Bills.component.css'],
  imports: [Bills_ChartComponent]
})
export class BillsComponent implements OnInit {

  billsService = inject(BillsService)

  constructor() { }

  ngOnInit() {
  }

}
