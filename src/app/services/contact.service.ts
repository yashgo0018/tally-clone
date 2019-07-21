import { Person } from '../model/person';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  formData: Person;

  constructor(private firestore: AngularFirestore) {}

  getContacts() {
    return this.firestore.collection('contact').snapshotChanges();
  }

  deleteContact(id: string) {
    this.firestore.doc(`contact/${id}`).delete();
  }

  writeContact(contact: Person) {
    const data = Object.assign({}, contact);
    delete data.id;
    if (contact.id == null || contact.id === '') {
      this.firestore.collection('person').add(data);
    } else {
      this.firestore.doc(`person/${contact.id}`).update(data);
    }
    return true;
  }
}
