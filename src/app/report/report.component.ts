import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  mode = 1;
  periods = {};

  constructor(
    public reportService: ReportService,
    public transactionService: TransactionService
  ) {}

  ngOnInit() {
    const date = new Date();
    const last7thday = date.getDate() - date.getDay();
    const lastWeek = date.getDate() - 7;
    this.periods[1] = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate()
    );
    this.periods[2] = new Date(date.getFullYear(), date.getMonth(), 1);
    this.periods[3] = new Date(
      date.getFullYear(),
      lastWeek > 0 ? date.getMonth() : date.getMonth() - 1,
      lastWeek > 0 ? lastWeek : 30 + lastWeek
    );
    this.periods[4] = new Date(
      date.getFullYear(),
      last7thday > 0 ? date.getMonth() : date.getMonth() - 1,
      last7thday > 0 ? last7thday : 30 + last7thday
    );
    this.periods[5] = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    console.log(this.transactionService.transactionAfter(this.periods[5]));
  }

  changeMode(mode: number) {
    this.mode = mode;
  }
}
