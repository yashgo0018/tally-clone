import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ContactService } from '../../services/contact.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class TransactionAddComponent implements OnInit {
  product: Product;
  role: string;
  type: string;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService,
    private contactService: ContactService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = this.router.url.split('/')[1] === 'sell' ? 'Buyer' : 'Seller';
    this.type = this.role === 'Seller' ? 'Purchase' : 'Sale';
    this.resetForm();
    this.resetProductForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.transactionService.formData = {
      id: null,
      name: {
        name: '',
        role: this.role
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
    this.transactionService.writeTransaction(this.transactionService.formData);
    this.resetForm(form);
    this.toastrService.success(`Created A ${this.type}`);
    this.router.navigate(['/transaction']);
  }

  editProduct(product: Product) {
    this.transactionService.formData.products = this.transactionService.formData.products.filter(
      val => val.id !== product.id
    );
    this.product = product;
  }
}
