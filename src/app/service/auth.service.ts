import { Injectable } from '@angular/core';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user: User | undefined;

  // private token = 'MyFakeToken';

  // jwt = require('jsonwebtoken');
  
  // getToken(): string {
  //   return this.token;
  // }

  // setUser(user: User)  {
  //   this.user = user;
  // }

    getUser(): User | undefined {
     return this.user;
    }

    
 
   private isAuthenticated = false;
   
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
