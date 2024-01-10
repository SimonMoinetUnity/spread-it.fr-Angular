import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Canal } from '../entity/canal';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private url = 'https://localhost:8080/canals';
  canalUsed!: Canal;

  constructor(private http: HttpClient) {

    const valeur_id = localStorage.getItem('CanalId');
    if (valeur_id !== null) {
      const id = parseInt(valeur_id); 
      this.getCanalById(id).subscribe((data) => {
        this.canalUsed = data
      })
    }
  }

  //Requêtes à l'API (SpringBoot)

  createCanal(canal: any): Observable<Canal> {
    console.log("Create Canal appelé");
    const canal2 = {
    "adminId":canal.adminId,
    "name": canal.name,
    "users" : [{id:canal.users[0].id}]
    }
    for (let i = 1; i < canal.users.length; i++) {
      const userId = canal.users[i].id;
      canal2.users.push({ id: userId });
    }
    return this.http.post<Canal>(this.url, canal2)
    // .pipe(
    //   tap((canal2: Canal) => {
    //      localStorage.setItem('CanalId', (canal2.id).toString());
         
    //    })
    // );
  }

  getCanalById(id: number): Observable<Canal> {
    return this.http.get<Canal>(`${this.url}/${id}`)
    // .pipe(
      // tap((canal: Canal) => {
      //    localStorage.setItem('CanalId', (canal.id).toString());
         
      //  })
    // ); 
  }

  deleteCanal(id: number) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  updateCanal(canal: Canal): Observable<Canal> {
    console.log('canal envoyé : ' + canal);
    let id = canal.id
    const canal2 = {
    "adminId":canal.adminId,
    "id":canal.id,
    "name": canal.name,
    "users" : [{id:canal.users[0].id}]
    }
    for (let i = 1; i < canal.users.length; i++) {
      const userId = canal.users[i].id;
      canal2.users.push({ id: userId });
    }
    return this.http.put<Canal>(this.url + '/' + id, canal2);
  }

  //ChatGPT

   // Fonction pour récupérer une liste de canaux à partir de leurs IDs
   getCanalsByIds(canalsIds: number[]): Observable<Canal[]> {
    const observables: Observable<Canal>[] = [];

    // Créer un tableau d'observables pour chaque ID de canal
    for (const canalId of canalsIds) {
      const observable = this.getCanalById(canalId);
      observables.push(observable);
    }

    // Utiliser forkJoin pour combiner les observables en un seul observable
    return forkJoin(observables);
  }


  

}