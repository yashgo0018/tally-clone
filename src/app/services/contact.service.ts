import { Contact } from '../model/contact.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  getContacts() {
    return this.firestore.collection('contact').snapshotChanges();
  }

  deleteContact(id: string) {
    this.firestore.doc(`contact/${id}`).delete();
  }

  writeContact(contact: Contact) {
    const data = Object.assign({}, contact);
    delete data.id;
    if (contact.id == null || contact.id === '') {
      this.firestore.collection('contact').add(data);
    } else {
      this.firestore.doc(`contact/${contact.id}`).update(data);
    }
    return true;
  }
}
