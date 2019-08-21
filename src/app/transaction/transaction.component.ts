import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  constructor(private router: Router, private authService: AngularFireAuth) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user == null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
