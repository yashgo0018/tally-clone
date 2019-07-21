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
    return this.firestore.collection('person').snapshotChanges();
  }

  deleteContact(id: string) {
    this.firestore.doc(`person/${id}`).delete();
  }
}
