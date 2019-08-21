import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from './product.service';
import { Product } from '../model/product.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  formData: Transaction;
  transactions: Transaction[];
  purchases: Transaction[];

  constructor(
    private firestore: AngularFirestore,
    private productService: ProductService,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.auth.authState.subscribe(user => {
      if (user != null) {
        this.getTransactions().subscribe(actionArray => {
          this.transactions = actionArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Transaction;
          });
          this.purchases = this.transactions.filter(
            val => val.type === 'Purchase'
          );
        });
      }
    });
  }

  getTransactions() {
    return this.firestore
      .collection('transaction', ref =>
        ref.where('userId', '==', this.authService.user.uid)
      )
      .snapshotChanges();
  }

  getTransaction(id: string) {
    return this.transactions.filter(val => val.id === id)[0];
  }

  deleteTransaction(id: string) {
    if (
      this.authService.isLoggedIn &&
      this.getTransaction(id).userId === this.authService.user.uid
    ) {
      this.firestore.doc(`transaction/${id}`).delete();
    }
  }

  writeTransaction(transaction: Transaction): Promise<any> {
    if (this.authService.isLoggedIn) {
      transaction.userId = this.authService.user.uid;
      const data = Object.assign({}, transaction);
      delete data.id;
      if (transaction.id == null || transaction.id === '') {
        return this.firestore.collection('transaction').add(data);
      } else {
        return this.firestore.doc(`transaction/${transaction.id}`).update(data);
      }
    } else {
      return new Promise((resolve, reject) => {
        reject('Not Authenticated');
      });
    }
  }

  transactionAfter(timestamp: Date) {
    return this.transactions
      .filter(val => val.date.seconds > timestamp.getTime() / 1000)
      .sort((a, b) => a.date.seconds - b.date.seconds);
  }
}
