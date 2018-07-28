import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
      private http: HttpClient
    ) {}

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post('http://localhost:9898/users/register', user, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post('http://localhost:9898/users/authenticate', user, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getProfile() {
    this.loadToken();
    this.getUser();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authToken,
        'Content-Type': 'application/json'
      })
    };
    // tslint:disable-next-line:no-unused-expression
    return this.http.get('http://localhost:9898/users/profile', httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    this.setUser(user);
    this.authToken = token;
    this.user = user;
    environment.userData = this.user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');
    return !helper.isTokenExpired(token);
  }

  getUser() {
    if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
        environment.userData = this.user;
        return this.user;
    }
    return false;
  }

  setUser(user) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
