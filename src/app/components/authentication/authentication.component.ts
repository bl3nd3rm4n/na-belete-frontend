import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  selectedIndex: number;
  links = [
    {path: 'login', label: 'Log in'},
    {path: 'register', label: 'Register'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
