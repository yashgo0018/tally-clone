import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductListComponent implements OnInit {
  faTrashAlt = faTrashAlt;

  constructor(private service: ProductService, private toastr: ToastrService) {}

  ngOnInit() {}

  onEdit(emp: Product): void {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string): void {
    this.service.deleteProduct(id);
    this.toastr.warning('Successfully Deleted Record.');
  }
}
