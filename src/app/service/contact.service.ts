import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../entity/user';
import { IToken } from '../Interface/IToken';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMessage(prenom: string, nom: string, email: string, message: string) {
    const body = {
      firstname: prenom,
      name: nom,
      email: email,
      message: message,
    };
    
    return this.http.post('https://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/contact/submit', body);  
  }

  sendEmail(email: string): Observable<IToken> {
    const body = {
      email: email
    };
    return this.http.post<IToken>('https://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/contact/email', body).pipe(
      tap((iToken: IToken) => {localStorage.setItem('UserId', (iToken.user.id).toString()); })
    );
  }
}
