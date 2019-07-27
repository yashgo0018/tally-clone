import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TransactionListComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}
}
