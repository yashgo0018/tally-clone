import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router, private authService: AngularFireAuth) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user == null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
