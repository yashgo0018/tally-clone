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
  constructor(private service: ProductService, private toastr: ToastrService) {}

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
    const isDone = this.service.writeProduct(form.value);
    if (isDone) {
      this.resetForm(form);
      this.toastr.success('Submitted Successfully.');
    } else {
      this.toastr.warning('Some Error Occured');
    }
  }
}
