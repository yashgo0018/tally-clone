import { Person } from '../model/person';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  formData: Person;
  contacts: Person[];

  constructor(private firestore: AngularFirestore) {
    this.getContacts().subscribe(actionArray => {
      this.contacts = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Person;
      });
      console.log(this.contacts);
    });
  }

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
      this.firestore.collection('contact').add(data);
    } else {
      this.firestore.doc(`contact/${contact.id}`).update(data);
    }
    return true;
  }
}
