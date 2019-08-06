import { Contact } from '../model/contact.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  formData: Contact;

  contacts: Contact[];
  buyers: Contact[];
  sellers: Contact[];

  constructor(private firestore: AngularFirestore) {
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

  getContact(id: string) {
    return this.contacts.filter(val => val.id === id)[0];
  }

  getContacts() {
    return this.firestore.collection('contact').snapshotChanges();
  }

  deleteContact(id: string) {
    this.firestore.doc(`contact/${id}`).delete();
  }

  async writeContact(contact: Contact) {
    const data = Object.assign({}, contact);
    delete data.id;
    if (contact.id == null || contact.id === '') {
      return this.firestore.collection('contact').add(data);
    } else {
      return this.firestore.doc(`contact/${contact.id}`).update(data);
    }
  }

  getContactFromString(name: string): Contact {
    return this.contacts.filter(val => val.name === name)[0];
  }
}
