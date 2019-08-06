import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ProductAddComponent implements OnInit {
  constructor(public service: ProductService, private toastr: ToastrService) {}

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
      quantity: 0,
      cost: 0
    };
  }

  onSubmit(form: NgForm): void {
    this.service
      .writeProduct(form.value)
      .then(val => {
        this.resetForm(form);
        this.toastr.success('Submitted Successfully.');
      })
      .catch(err => this.toastr.warning('You made an error'));
  }
}
