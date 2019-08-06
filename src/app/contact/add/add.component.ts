import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  add: string[] = ['', '', ''];
  constructor(public service: ContactService, public toastr: ToastrService) {}

  ngOnInit() {
    this.resetForm();
    console.log(this.service.formData);
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      email: '',
      address: ['', '', ''],
      mobile: '',
      role: 'Buyer'
    };
  }
  onSubmit(): void {
    this.service.formData.address = this.service.formData.address
      .filter(val => val !== '')
      .map(val => this.clean(val));

    this.service
      .writeContact(this.service.formData)
      .then(val => {
        this.resetForm();
        this.toastr.success('Submitted Successfully.');
      })
      .catch(err => this.toastr.warning('You made an error'));
  }

  clean(str: string): string {
    if (str[0] === ' ' || str[0] === ',') {
      str = str
        .split('')
        .slice(1)
        .join('');
    }
    return str;
  }
}
