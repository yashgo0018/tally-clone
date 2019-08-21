import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../authentication.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private authService: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user != null) {
        this.router.navigate(['/']);
      }
    });
  }
}
