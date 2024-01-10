import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/Interface/Role';
import { Avis } from 'src/app/entity/Avis';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit{

  constructor(private us: UserService){}

  @Input()
  user: User={
    role: Role.USER,
    id: 0,
    nickname: '',
    email: '',
    password: '',
    isLogged: false,
    canals: [],
    nbArticles:0
  }

  @Input()
  avis: Avis = {
    id: 0,
    article_id: 0,
    userId: 0,
    note: 0,
    commentaire: '',
    date : new Date()
  }

  etoiles: any[] = [];


  ngOnInit(): void {
    this.genererEtoiles();

    this.us.getUserById(this.avis.userId).subscribe((data) => { this.user = data, console.log(data) },
      (error) => { console.error('Error getting user:', error); }
    );

  }

  genererEtoiles(): void {
    const nombreEtoiles = this.avis.note;

    for (let i = 0; i < 5; i++) {
      this.etoiles.push({ remplie: i < nombreEtoiles });
    }
  }

}
