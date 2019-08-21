import { Contact } from '../model/contact.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../model/transaction.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  formData: Contact;

  contacts: Contact[];
  buyers: Contact[];
  sellers: Contact[];

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.auth.authState.subscribe(user => {
      if (user != null) {
        this.getContacts().subscribe(actionArray => {
          this.contacts = actionArray.map(item => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            } as Contact;
          });
          this.buyers = this.contacts.filter(val => val.role === 'Buyer');
          this.sellers = this.contacts.filter(val => val.role === 'Seller');
        });
      }
    });
  }

  getContacts() {
    return this.firestore
      .collection('contact', ref =>
        ref.where('userId', '==', this.authService.user.uid)
      )
      .snapshotChanges();
  }

  getContact(id: string) {
    return this.contacts.filter(val => val.id === id)[0];
  }

  deleteContact(id: string) {
    if (
      this.authService.isLoggedIn &&
      this.getContact(id).userId === this.authService.user.uid
    ) {
      this.firestore.doc(`contact/${id}`).delete();
    }
  }

  writeContact(contact: Contact): Promise<any> {
    if (this.authService.isLoggedIn) {
      contact.userId = this.authService.user.uid;
      const data = Object.assign({}, contact);
      delete data.id;
      if (contact.id == null || contact.id === '') {
        return this.firestore.collection('contact').add(data);
      } else {
        return this.firestore.doc(`contact/${contact.id}`).update(data);
      }
    } else {
      return new Promise((resolve, reject) => {
        reject('Not Authenticated');
      });
    }
  }

  getContactFromString(name: string): Contact {
    return this.contacts.filter(val => val.name === name)[0];
  }
}
