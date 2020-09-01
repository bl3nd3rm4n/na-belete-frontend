import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services';
import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../../model';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorFromServer = '';
  focused = false;
  matcher = new MyErrorStateMatcher();

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.minLength(16)]),
    }, {validators: checkPasswords});
  }


  registerUser(): void {
    this.focused = false;
    const user: User = {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
    };

    this.authenticationService.register(user)
      .subscribe(data => console.log(data),
        data => this.errorFromServer = data.error);
  }
}

const checkPasswords: ValidatorFn = (group: FormGroup) => {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;

  return pass === confirmPass ? null : {notSame: true};
};
