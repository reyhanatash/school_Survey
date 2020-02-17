import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as sha256 from 'sha256/lib/sha256.js';

@Injectable()
export class AuthenticationService {
  // url = 'http://localhost:3000/';
  url = 'http://37.156.28.19:3000/';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const uri = this.url + 'api/user/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const pass = sha256(password);
    // const data2 = 'username=' + username + '&password=' + pass + '&grant_type=password';
    const data = {
      username: username,
      password: pass
    };
    return this.http.post<any>(uri, data, httpOptions).map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', user.data['token']);
        localStorage.setItem('typeUser', user.data['type']);
      }

      return user;
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('typeUser');
  }
}
