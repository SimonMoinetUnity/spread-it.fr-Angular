import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/entity/Article';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';
import { Canal } from 'src/app/entity/canal';
import { Role } from 'src/app/Interface/Role';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit{

  constructor(private router: Router, private userService: UserService, private as: ArticleService) {}

  @Input()
  user: User={
    role: Role.USER,
    id: 0,
    nickname: '',
    email: '',
    password: '',
    isLogged: false,
    canals: [],
    nbArticles : 0
  }

  @Input()
  article: Article = {
    id: 0,
    html: '',
    titre: '',
    published: 0,
    userId: 0,
    imageName: '',
    description: '',
    date : new Date(),
    nbAvis : 0,
    noteMoy : 0
  }

  urlPage!: String;

  ngOnInit(): void {
    this.genererEtoiles();
    
    if(localStorage.getItem('token')){
      this.userService.getUserById(this.article.userId).subscribe(
        (data) => { this.user = data; },
        (error) => { console.error('Error creating article:', error); }
      );
    }
    
    
  }

  lireArticle() {
    this.router.navigateByUrl(`article/${this.article.id}`);
  }

  isUrlMatching(): boolean {
    if (this.userService.userlogged !== undefined) {
      this.urlPage = '/articles';
    }
    return this.router.url === this.urlPage;
  }

  publierArticle() {
    this.article.published = this.article.published === 0 ? 1 : 0;
    this.article.date = new Date();
    this.as.updateArticle(this.article).subscribe(data => console.log(data));
  }

  modifierArticle() {
    if (this.userService.userlogged !== undefined) {
      this.router.navigate(['/textEditor/' + this.article.id])
    }
  }

  supprimerArticle() {
    if (this.userService.userlogged !== undefined) {
      this.as.deleteArticle(this.article.id).subscribe(data => console.log(data));
    }
    //Met à jour le nombre d'article de l'utilisateur
    this.user.nbArticles--;
    this.userService.updateUser(this.user).subscribe(data => console.log(data));
    window.location.reload();
  }

  etoiles: any[] = [];

  genererEtoiles(): void {
    const nombreEtoiles = Math.round(this.article.noteMoy);
    console.log('nombreEtoiles',nombreEtoiles)
    for (let i = 0; i < 5; i++) {
      this.etoiles.push({ remplie: i < nombreEtoiles });
    }
  }

}
