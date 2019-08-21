import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../authentication.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user != null) {
        this.router.navigate(['/']);
      }
    });
  }
}
