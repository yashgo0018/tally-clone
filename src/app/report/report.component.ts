import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { TransactionService } from '../services/transaction.service';
import { Timestamp } from '../model/timestamp.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  mode = 1;
  periods = {};
  data: any;
  y: Timestamp[];
  constructor(
    public reportService: ReportService,
    public transactionService: TransactionService,
    private router: Router,
    private authService: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user == null) {
        this.router.navigate(['/login']);
      }
    });
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
    const interval = setInterval(() => {
      if (this.data != null) {
        clearInterval(interval);
        return;
      }
      if (this.transactionService.transactions == null) {
        return;
      }
      this.generateChart();
    }, 0.1);
  }

  changeMode(mode: number) {
    this.mode = mode;
    this.generateChart();
  }

  generateChart() {
    this.data = this.reportService.getAnalytics(this.periods[this.mode]);
  }
}
