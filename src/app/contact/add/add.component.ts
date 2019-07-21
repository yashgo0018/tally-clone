import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/contact.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(
    private service: PersonService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      email: '',
      address: '',
      mobile: '',
      role: 'Buyer'
    };
  }
  onSubmit(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null || form.value.id === '') {
      console.log(data);
      this.firestore.collection('person').add(data);
    } else {
      this.firestore.doc(`person/${form.value.id}`).update(data);
    }
    this.resetForm(form);
    this.toastr.success('Submitted Successfully.');
  }
}
