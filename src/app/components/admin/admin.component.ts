import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {User} from '../../model';
import {UserService} from '../../services';

@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}
