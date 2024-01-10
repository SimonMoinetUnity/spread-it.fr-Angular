import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/entity/Article';
import { ArticleService } from 'src/app/service/article.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/entity/user';
import { AvisService } from 'src/app/service/avis.service';
import { Avis } from 'src/app/entity/Avis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/Interface/Role';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent {



  listeAvis: any[] = [];
  form!: FormGroup;
  formStar!: FormGroup;
  nombreEtoiles: number = 0;

  constructor(private fb: FormBuilder, private avisService :AvisService, private us : UserService, private route: ActivatedRoute, private articleService: ArticleService, private router: Router, private location: Location) {

    this.form = this.fb.group({
      messageContent: ['', [Validators.required, Validators.minLength(1)]],
    });
    
  }

  etoiles: any[] = [];
  noteMoyenne: number = 0;
  nbNotes: number = 0;

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

  @Input()
  avisEcrit: Avis = {
    id: 0,
    article_id: 0,
    userId: 0,
    note: 0,
    commentaire: '',
    date : new Date()
  }

  ngOnInit(): void {
    this.getAvis();
    this.getArticles();
    this.getUser();
  }

  handleCheckboxChange(checkboxId: number) {
    console.log('Etoile ' + checkboxId)
    this.nombreEtoiles = checkboxId;
  }

  Back() {
    this.location.back();
  }

  sauvegarder() {

    this.avisEcrit.commentaire = this.form.value.messageContent;
    this.avisEcrit.date = new Date();
    this.avisEcrit.article_id = this.article.id;
    this.avisEcrit.userId = this.user.id;
    this.avisEcrit.note = this.nombreEtoiles;

      this.avisService.createAvis(this.avisEcrit).subscribe((response) => {
          console.log('Avis created successfully:', response);
          this.form.reset();
          this.listeAvis.push(this.avisEcrit);
          this.calculerNoteMoyenne();
          this.majArticle();
          window.location.reload();
        },
        (error) => {
          console.error('Error creating canal:', error);
        }
      );
  }

calculerNoteMoyenne(): void {
  const nombreAvis = this.listeAvis.length;
  this.nbNotes = nombreAvis;
  if (nombreAvis > 0) {
    const sommeNotes = this.listeAvis.reduce((somme, avis) => somme + avis.note, 0);
    
    this.noteMoyenne = sommeNotes / nombreAvis;
    this.noteMoyenne = parseFloat(this.noteMoyenne.toFixed(1));
  } else {
    console.log('Aucun avis dans la liste.');
  }
  this.article.nbAvis = this.nbNotes;
  this.article.noteMoy = this.noteMoyenne;
}

genererEtoiles(): void {
  const nombreEtoiles = Math.round(this.noteMoyenne); // Arrondir à la note entière la plus proche

  for (let i = 0; i < 5; i++) {
    this.etoiles.push({ remplie: i < nombreEtoiles });
  }
  console.log('Note moyenne:', this.noteMoyenne);
}

avisDejaDonne(): boolean {
  if(this.user.id != 0){
    return this.listeAvis.some(avis => avis.userId === this.user.id);
  }
  return false
}

// Récupération des AVIS
getAvis(){
  this.avisService.getAvisByArticleId(this.route.snapshot.params['id']).subscribe((data) => 
  {this.listeAvis = data, 
  console.log(this.listeAvis),
  this.calculerNoteMoyenne(),
  this.genererEtoiles();
});

}


// Récupération de l'ARTICLE
getArticles(){
  const articleId = +this.route.snapshot.params['id'];
  this.articleService.getArticleById(articleId).subscribe(
    response => {
      this.article = response;
      this.calculerNoteMoyenne()
    },
    error => {
      console.error("Error deleting the message:", error);
  })
}

// MAJ de l'ARTICLE
majArticle(){
  this.articleService.updateArticle(this.article).subscribe((response) => {
    console.log('Article modifié avec succes', response);},
    (error) => {
    console.error('Error updating article:', error);
    }
  );
}

// Récupération du USER
getUser(){
  const id = this.us.userId;
  this.us.getUserById(id).subscribe((data) => {this.user = data;})
  // this.user = this.us.getUser() !== undefined ? this.us.getUser() : this.user;
  // console.log('this.us.userlogged : ' + this.us.userlogged?.id)
} 

seConnecter() {
  this.router.navigate(['/login']);
  }

}
