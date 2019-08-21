import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private router: Router, private authService: AngularFireAuth) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user == null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
