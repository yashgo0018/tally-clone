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
    const isDone = this.service.writeContact(form.value);
    if (isDone) {
      this.resetForm(form);
      this.toastr.success('Submitted Successfully.');
    } else {
      this.toastr.warning('Some Error Occured');
    }
  }
}
