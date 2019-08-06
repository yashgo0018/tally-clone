import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../model/transaction.model';
import { Router } from '@angular/router';
import { faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TransactionListComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faDownload = faDownload;
  constructor(
    public transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {}

  loadTransaction(transaction: Transaction) {
    this.transactionService.formData = transaction;
    this.router.navigate([
      transaction.type === 'Purchase' ? 'purchase' : 'sell'
    ]);
  }

  download(id: string) {
    const transaction = this.transactionService.getTransaction(id);
    const doc = new jsPDF();

    const AddressLineHeight = 5;
    let min = 22;

    const img = new Image();
    img.src = 'assets/logo.png';

    img.onload = () => {
      doc.addImage(img, 'png', 10, 5, 30, 30);
      doc.text('Brand Name', 40, 20);
      doc.text(transaction.contact.name, 120, 15);
      doc.setFontSize(10);
      transaction.contact.address.forEach(line => {
        doc.text(line, 120, min);
        min += AddressLineHeight;
      });

      const columns = ['S No', 'Product Name', 'Cost', 'Quantity', 'Total'];
      const rows = [];
      let i = 1;
      transaction.products.forEach(product => {
        rows.push([
          i,
          product.name,
          product.cost,
          product.quantity,
          product.cost * product.quantity
        ]);
        i += 1;
      });
      // @ts-ignore
      doc.autoTable({
        head: [columns],
        body: rows,
        margin: { top: min + 10, bottom: 10 }
      });

      doc.text(
        'Authorized Signature',
        120,
        min + 40 + transaction.products.length * 20
      );

      doc.save('first.pdf');
    };
  }
}
