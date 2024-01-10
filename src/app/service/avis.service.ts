import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Canal } from '../entity/canal';
import { Article } from '../entity/Article';
import { Avis } from '../entity/Avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  
  private url = 'http://localhost:8080/avis';
  avis!: Avis;

  constructor(private http: HttpClient) {}

  createAvis(avis: any): Observable<any> {
    return this.http.post(this.url, avis);
  }

  // updateAvis(avis: Avis): Observable<Avis> {
  //   let id = avis.id;
  //   return this.http.put<Avis>(`${this.url}/${id}`, avis);
  // }


  getAvisByArticleId(id: number): Observable<any> {
    return this.http.get(`${this.url}/byArticleId/${id}`);
  }

  // deleteAvis(id: number) : Observable<any>{
  //   return this.http.delete(`${this.url}/${id}`)
  // }

 
}