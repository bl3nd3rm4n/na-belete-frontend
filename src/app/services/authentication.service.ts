import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {LoggedInUser} from '../model/logged-in-user';
import {tap} from 'rxjs/operators';
import {User} from '../model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private loggedInUserSubject: BehaviorSubject<LoggedInUser>;

  constructor(private httpClient: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(localStorage.getItem('loggedInUser')));
  }

  public get loggedInUserValue(): LoggedInUser {
    return this.loggedInUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>('api/login', {username, password}).pipe(
      tap(data => {
        const obj = JSON.parse(atob(data.jwt.split('.')[1]));
        const loggedInUser: LoggedInUser = {
          username: obj.sub,
          role: obj.role,
          token: data.jwt
        };
        this.loggedInUserSubject.next(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      })
    );
  }

  logOut(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }

  register(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post<any>('api/register', user);
  }
}
