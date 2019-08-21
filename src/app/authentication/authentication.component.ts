import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  @Input() heading: string;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }
}
