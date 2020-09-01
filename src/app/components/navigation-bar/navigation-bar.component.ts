import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services';
import {LoggedInUser} from '../../model/logged-in-user';
import {Role} from '../../model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  publicLinks = [
    {path: 'home', label: 'Home'},

  ];
  authenticationLinks = [
    {path: 'authentication/login', label: 'Log in'},
    {path: 'authentication/register', label: 'Register'},
  ];
  adminLinks = [
    {path: 'admin', label: 'Admin'},
  ];
  userLinks = [
    {path: 'user', label: 'User'},
  ];

  Role = Role;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  logOutClick(): void {
    this.authenticationService.logOut();
  }

  loggedInUserValue(): LoggedInUser {
    return this.authenticationService.loggedInUserValue;
  }
}
