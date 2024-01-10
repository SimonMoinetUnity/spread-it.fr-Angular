import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../entity/user';
import { AuthService } from './auth.service';
import { IToken } from '../Interface/IToken';
import { Role } from '../Interface/Role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/users';
  private urlAuth = 'http://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/auth';
  
  userlogged!:  User | undefined;

  userId!:number;

  constructor(private http: HttpClient, private authService: AuthService) {

    //Permet de garder l'utilisateur connecté après un reload de la page
    const valeur_id = localStorage.getItem('UserId');
    if (valeur_id !== null) {
      this.userId = parseInt(valeur_id); 
      this.getUserById(this.userId).subscribe((data) => {
        this.userlogged = data
      })
    }
  } 


  //Requêtes à l'API (SpringBoot)

  createUser(nickname: string, email: string, password: string){
    const body = {
      nickname: nickname,
      email: email,
      password: password,
    };
    return this.http.post(this.urlAuth + '/register', body);
  }

  loginUser(email: string, password: string) : Observable<IToken>{
    const body = {
      email: email,
      password: password,
    };
    
    return this.http.post<IToken>(this.urlAuth + '/authenticate', body)
      .pipe(
        tap((iToken: IToken) => {localStorage.setItem('UserId', (iToken.user.id).toString()); })
      );  
  }

  updateUser(user: User): Observable<User> {
    console.log(user);
    user.canals=[];
    let id = user.id
    return this.http.put<User>(this.url + '/' + id, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getUserIdByNickname(nickname: String): Observable<number> {
    return this.http.get<number>(`${this.url}/id/${nickname}`);
  }

  getUserListByCanalId(canalId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/canal/${canalId}`);
  }



  // Autres fonctions

  // Renvoie le role de l'utilisateur ('user' ou 'admin')
  getRole(): Role | undefined {
    if (this.userlogged) {
      return this.userlogged.role;
    }
    return undefined;
  }

  // Déconnecte l'utilisateur en supprimant l'item 'id'
  logout() {
    this.authService.logout();
    localStorage.removeItem('UserId');
    localStorage.removeItem('CanalId');
    // window.location.reload();
  }

  getUser(){
    return this.userlogged;
  }

  checkNicknameAvailability(nickname: string): Observable<any> {
    const url = `${this.urlAuth}/checkNickname/${nickname}`;
    return this.http.get(url);
  }

 

}
