import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { ContactService } from 'src/app/service/contact.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent{

  articles: any[] = [];

  plusRecentsButtonColor = 'dark'
  meilleursNotesButtonColor = 'secondary'
  plusDeNotesButtonColor = 'secondary'

  form!: FormGroup;

  constructor(private contactService : ContactService, private articlelService: ArticleService, private router : Router, private userService : UserService, private httpClient : HttpClient, private fb: FormBuilder) {

    this.articlelService.getArticlesByDate().subscribe((data) => this.articles = data);

    this.form = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  ngOnInit(){
    
  }

  plusRecents(){
    this.plusRecentsButtonColor = 'dark'
    this.meilleursNotesButtonColor = 'secondary'
    this.plusDeNotesButtonColor = 'secondary'
    this.articlelService.getArticlesByDate().subscribe((data) => this.articles = data);
  }

  meilleursNotes(){
    this.plusRecentsButtonColor = 'secondary'
    this.meilleursNotesButtonColor = 'dark'
    this.plusDeNotesButtonColor = 'secondary'
    this.articlelService.getArticlesByTopRated().subscribe((data) => this.articles = data);
  }

  plusDeNotes(){
    this.plusRecentsButtonColor = 'secondary'
    this.meilleursNotesButtonColor = 'secondary'
    this.plusDeNotesButtonColor = 'dark'
    this.articlelService.getArticlesByMostCommented().subscribe((data) => this.articles = data);  
  }

  createArticle(){
    if (this.userService.userlogged) {
      this.router.navigate(['/textEditor']);
    }
    else{
      this.router.navigate(['/login']);
    }
    
  }

  submitForm() {

    this.contactService.sendMessage(this.form.value.prenom,this.form.value.nom,this.form.value.email,this.form.value.message)
        .subscribe(() => {
            console.log('Message envoyé');
            window.location.reload();
        });
  }

}


