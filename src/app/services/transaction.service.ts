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

  manageStock(transaction: Transaction, oldTransaction?: Transaction) {
    if (oldTransaction) {
      const list = [];
      transaction.products.forEach(element => {
        oldTransaction.products.forEach(oldElement => {
          if (oldElement.id === element.id) {
            list.push({
              id: element.id,
              quantity: element.quantity - oldElement.quantity
            });
          }
        });
      });
      list.forEach(val => this.productService.addStock(val.id, val.quantity));
      return;
    }

    transaction.products.forEach(product => {
      console.log(transaction.type);
      if (transaction.type === 'Purchase') {
        this.productService.addStock(product.id, product.quantity);
      } else {
        this.productService.subtractStock(product.id, product.quantity);
      }
    });
  }

  deleteTransaction(id: string) {
    this.manageStock(this.getTransaction(id));
    this.firestore.doc(`transaction/${id}`).delete();
  }

  writeTransaction(transaction: Transaction) {
    const data = Object.assign({}, transaction);
    delete data.id;

    if (transaction.id == null || transaction.id === '') {
      this.manageStock(transaction);
      this.firestore.collection('transaction').add(data);
    } else {
      const oldTransaction = this.getTransaction(transaction.id);
      this.manageStock(transaction, oldTransaction);
      this.firestore.doc(`transaction/${transaction.id}`).update(data);
    }
    return true;
  }
}
