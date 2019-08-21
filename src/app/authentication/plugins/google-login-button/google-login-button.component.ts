import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: [
    './google-login-button.component.css',
    '../../authentication.component.css'
  ]
})
export class GoogleLoginButtonComponent implements OnInit {
  @Input() classes: string;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}
}
