import { Injectable } from '@angular/core';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined;

  private isAuthenticated = false;

  token = 'Fake Token'

  getToken(): String {
    return this.token;
  }

  getUser(): User | undefined {
    return this.user;
  }

  logout() {
    this.isAuthenticated = false;
  }

  login() {
    this.isAuthenticated = true;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

}
