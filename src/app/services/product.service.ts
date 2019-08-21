import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../model/product.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Product;
  products: Product[];

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.auth.authState.subscribe(user => {
      if (user != null) {
        this.getProducts(user.uid).subscribe(actionArray => {
          this.products = actionArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Product;
          });
        });
      } else {
        this.products = [];
      }
    });
  }

  getProducts(uid: string) {
    return this.firestore
      .collection('product', ref => ref.where('userId', '==', uid))
      .snapshotChanges();
  }

  getProduct(id: string) {
    return this.products.filter(val => val.id === id)[0];
  }

  getProductFromString(name: string): Product {
    return this.products.filter(val => val.name === name)[0];
  }

  writeProduct(product: Product): Promise<any> {
    if (this.authService.isLoggedIn) {
      product.userId = this.authService.user.uid;
      const data = Object.assign({}, product);
      delete data.id;
      if (product.id == null || product.id === '') {
        return this.firestore.collection('product').add(data);
      } else {
        return this.firestore.doc(`product/${product.id}`).update(data);
      }
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject('Not Authenticated'), 300);
      });
    }
  }

  deleteProduct(id: string) {
    if (
      this.authService.isLoggedIn &&
      this.getProduct(id).userId === this.authService.user.uid
    ) {
      this.firestore.doc(`product/${id}`).delete();
    }
  }
}
