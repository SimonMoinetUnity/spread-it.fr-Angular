import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/entity/user';
import { ArticleService } from 'src/app/service/article.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-article-list-user',
  templateUrl: './article-list-user.component.html',
  styleUrls: ['./article-list-user.component.css']
})
export class ArticleListUserComponent implements OnInit{

  articles: any[] = [];
  
  constructor(private articlelService: ArticleService, private userService:UserService, private router : Router) {}

  ngOnInit(): void {
    const id = this.userService.userId;
    this.articlelService.getArticlesByUserId(id).subscribe((data) => this.articles = data);
  }

  createArticle(){
    this.router.navigate(['/textEditor']);
  }

}
