import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('api/users');
  }

  deleteUser(username: string): Observable<any> {
    return this.httpClient.request('delete', 'api/user', {body: {username}});
  }
}
