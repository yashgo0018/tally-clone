import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ContactService } from 'src/app/services/contact.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Product } from 'src/app/model/product.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class TransactionAddComponent implements OnInit, OnDestroy {
  product: Product;
  role: string;
  type: string;

  constructor(
    public productService: ProductService,
    public transactionService: TransactionService,
    public contactService: ContactService,
    public toastrService: ToastrService,
    public router: Router,
    private authService: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user == null) {
        this.router.navigate(['/login']);
      }
    });
    this.role = this.router.url.split('/')[1] === 'sell' ? 'Buyer' : 'Seller';
    this.type = this.role === 'Seller' ? 'Purchase' : 'Sale';
    if (this.transactionService.formData === undefined) {
      this.resetForm();
    }
    this.resetProductForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.transactionService.formData = {
      id: null,
      name: '',
      contact: {
        id: null,
        name: '',
        email: '',
        address: ['', '', ''],
        mobile: '',
        role: 'Buyer'
      },
      products: [],
      type: this.type,
      total: 0,
      date: new Date('1/1/2001')
    };
  }

  resetProductForm() {
    this.product = {
      name: '',
      quantity: 1,
      cost: 0
    };
  }

  productChanged() {
    const product = this.productService.getProductFromString(this.product.name);
    this.product.id = product.id;
    this.product.cost = product.cost;
  }

  contactChanged() {
    this.transactionService.formData.contact = this.contactService.getContact(
      this.transactionService.formData.name
    );
  }

  addProduct() {
    if (
      this.transactionService.formData.products.filter(
        val => val.id === this.product.id
      ).length > 0
    ) {
      this.toastrService.warning('Product Already In Invoice');
      return;
    }
    this.transactionService.formData.products.push(this.product);
    this.resetProductForm();
  }

  onSubmit(form: NgForm) {
    if (this.transactionService.formData.date !== new Date('1/1/2001')) {
      this.transactionService.formData.date = new Date();
    }
    this.transactionService.formData.products.forEach(
      val => (this.transactionService.formData.total += val.cost * val.quantity)
    );
    this.transactionService
      .writeTransaction(this.transactionService.formData)
      .then(() => {
        this.resetForm(form);
        this.toastrService.success(`Created A ${this.type}`);
        this.router.navigate(['/transaction']);
      })
      .catch(err => this.toastrService.warning(`You Made A Error`));
  }

  editProduct(product: Product) {
    this.transactionService.formData.products = this.transactionService.formData.products.filter(
      val => val.id !== product.id
    );
    this.product = product;
  }

  ngOnDestroy(): void {
    this.transactionService.formData = undefined;
  }
}
