import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../entity/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';
  userlogged!:  User | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {

    //this.userlogged = authService.getUser();
    const valeur_id = localStorage.getItem('id');
    if (valeur_id !== null) {
      const id = parseInt(valeur_id); // Utilisez parseFloat() pour les nombres décimaux
      this.getUserById(id).subscribe((data) => {
        this.userlogged = data
      })
    }
    
    
  } 

  

  createUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }

  // login(email: string, password: string): Observable<User> {
  //   const body = {
  //     email: email,
  //     password: password,
  //   };
  //   return this.http.post<User>(this.url + '/signIn', body).pipe(
  //     map((user: User) => {
  //       this.authService.setUser(user); // Store user in AuthService
  //       return user;
  //     })
  //   );  
  // }

  login(email: string, password: string): Observable<User> {
    const body = {
      email: email,
      password: password,
    };
    console.log("La méthode a été appelée");
    return this.http.post<User>(this.url + '/signIn', body)
    .pipe(
      tap((user: User) => {
         localStorage.setItem('id', (user.id).toString());
       })
    );  
  }

  getRole(): string | undefined {
    console.log('user : ' + this.userlogged);
    if (this.userlogged) {
      return this.userlogged.role;
    }
    return undefined;
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('id');
    window.location.reload();
  }

  updateUser(user: User): Observable<User> {
    console.log(user);
    let id = user.id
    return this.http.put<User>(this.url + '/' + id, user);
  }

  getAllUSers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

}
