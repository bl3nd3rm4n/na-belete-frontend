import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorFromServer = '';
  focused = false;


  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  loginUser(): void {
    this.focused = false;
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authenticationService.login(username, password)
      .subscribe(data => console.log(data),
        data => this.errorFromServer = data.error);
  }
}


