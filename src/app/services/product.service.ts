import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../model/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Product;
  products: Product[];

  constructor(private firestore: AngularFirestore) {
    this.getProducts().subscribe(actionArray => {
      this.products = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Product;
      });
    });
  }

  getProducts() {
    return this.firestore.collection('product').snapshotChanges();
  }

  getProduct(id: string) {
    return this.products.filter(val => val.id === id)[0];
  }

  getProductFromString(name: string): Product {
    return this.products.filter(val => val.name === name)[0];
  }

  writeProduct(product: Product) {
    const data = Object.assign({}, product);
    delete data.id;
    if (product.id == null || product.id === '') {
      this.firestore.collection('product').add(data);
    } else {
      this.firestore.doc(`product/${product.id}`).update(data);
    }
    return true;
  }

  deleteProduct(id: string) {
    this.firestore.doc(`product/${id}`).delete();
  }
}
