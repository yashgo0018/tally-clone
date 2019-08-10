import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  formData: Transaction;
  transactions: Transaction[];
  purchases: Transaction[];

  constructor(
    private firestore: AngularFirestore,
    private productService: ProductService
  ) {
    this.getTransactions().subscribe(actionArray => {
      this.transactions = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Transaction;
      });
      this.purchases = this.transactions.filter(val => val.type === 'Purchase');
    });
  }

  getTransactions() {
    return this.firestore.collection('transaction').snapshotChanges();
  }

  getTransaction(id: string) {
    return this.transactions.filter(val => val.id === id)[0];
  }

  deleteTransaction(id: string) {
    this.firestore.doc(`transaction/${id}`).delete();
  }

  async writeTransaction(transaction: Transaction) {
    const data = Object.assign({}, transaction);
    delete data.id;
    if (transaction.id == null || transaction.id === '') {
      return this.firestore.collection('transaction').add(data);
    } else {
      return this.firestore.doc(`transaction/${transaction.id}`).update(data);
    }
  }

  transactionAfter(timestamp: Date) {
    return this.transactions
      .filter(val => val.date.seconds > timestamp.getTime() / 1000)
      .sort((a, b) => a.date.seconds - b.date.seconds);
  }
}
