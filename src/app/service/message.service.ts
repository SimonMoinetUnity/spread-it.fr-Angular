import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { CanalService } from './canal.service';
import { Message } from '../entity/message';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'http://localhost:8080/messages';


  constructor(private route: ActivatedRoute,private http: HttpClient, private us: UserService, private cs: CanalService, private authService: AuthService) { 
    
  }

  //Requêtes à l'API (SpringBoot)

  createMessages(content: string, canalId:number): Observable<Object> {
    let date = new Date();
    if (this.us.userlogged) {
      
      
      console.log('this.cs.canalUsed.id' + canalId)
      const newMessage = { user: { id: this.us.userlogged.id }, canal: { id: canalId }, date: date, content: content }
      return this.http.post(this.url, newMessage);
    } else {
      return throwError('User not logged in');
    }

  }

  getMessagesByCanalId(id: number) {
    return this.http.get<Message[]>(`${this.url}/canal/${id}`);
  }

  deleteMessageById(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`,{ responseType: 'text' });
  }





}