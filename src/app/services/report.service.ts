import { TransactionService } from 'src/app/services/transaction.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private transactionService: TransactionService) {}

  getAnalytics(timestamp: Date) {
    const transactions = this.transactionService.transactionAfter(timestamp);

    const data = {
      x: transactions.map(val =>
        val.type === 'Sale' ? val.total : -val.total
      ),
      saleY: transactions
        .filter(val => val.type === 'Sale')
        .map(val => new Date(val.date.seconds * 1000)),
      purchaseY: transactions
        .filter(val => val.type === 'Purchase')
        .map(val => new Date(val.date.seconds * 1000)),
      sale: sum(
        transactions.filter(val => val.type === 'Sale').map(val => val.total)
      ),
      purchase: sum(
        transactions
          .filter(val => val.type === 'Purchase')
          .map(val => val.total)
      ),
      profit: sum(
        transactions.map(val => (val.type === 'Sale' ? val.total : -val.total))
      ),
      saleChartData: transactions
        .filter(val => val.type === 'Sale')
        .map(val => val.total),
      purchaseChartData: transactions
        .filter(val => val.type === 'Purchase')
        .map(val => val.total)
    };

    return data;
  }
}

function sum(lst: Array<number>) {
  let x = 0;
  lst.forEach(val => (x += val));
  return x;
}
