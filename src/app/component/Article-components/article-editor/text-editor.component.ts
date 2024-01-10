import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorToolbarComponent } from '@kolkov/angular-editor';
import { Observable, take } from 'rxjs';
import { Role } from 'src/app/Interface/Role';
import { Article } from 'src/app/entity/Article';
import { User } from 'src/app/entity/user';
import { ArticleService } from 'src/app/service/article.service';
import { CompressImageService } from 'src/app/service/compress-image.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

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

  constructor(private compressImage: CompressImageService,private route: ActivatedRoute,private service: ArticleService, private router: Router, private userService:UserService) { }

  ngOnInit(): void {
    console.log('route : ' + this.router.url)
    if (this.router.url != '/textEditor') {
      let id = this.route.snapshot.params['id'];
      this.service.getArticleById(id).subscribe(data => {
        this.article = data,
        this.htmlContent = this.article.html;
      });
    }

    this.article.userId = this.userService.userId;
    this.userService.getUserById(this.userService.userId).subscribe(data=>this.user=data);
  }

  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: '',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['insertImage'],['insertVideo']
    ]
  };

  sauvegarder() {
    this.article.html = this.htmlContent;
    this.onUpload();

    if (this.router.url == '/textEditor') {
      this.user.nbArticles++;
    }

    
    this.userService.updateUser(this.user).subscribe(
    (data) => {console.log(data)},
    (error) => {console.error('Error updating user : ', error);}
    );

    if (this.router.url != '/textEditor') {
      console.log("Service HTML : " + this.article.html);
      this.service.updateArticle(this.article).subscribe(data => console.log(data));
    }
    else {
      this.service.createArticle(this.article).subscribe((data) => console.log(data));
    }
    this.router.navigateByUrl('/');
  }

  selectedImage: File | null = null;
  sourceImage!:String;

  //Récupère l'image sélectionnée
  onFileSelected(event: Event): Observable<void> {

    return new Observable<void>((observer) => {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
       if (this.selectedImage.size > 1048576) {
         this.compressImage.compress(this.selectedImage)
      .pipe(take(1))
      .subscribe(compressedImage => {
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        
      })
      } 
      
    }

    setTimeout(() => {
      // Deuxième instruction
      console.log('Deuxième instruction');
      this.onUpload();
      // Indiquer que l'observable est terminé
      observer.next();
      observer.complete();
    }, 2000); // Délai d'une seconde (simulé)
    });
  }

  maMethode(event: Event){

    this.onFileSelected(event).subscribe((x) => {
      if (this.selectedImage) {
        this.article.imageName = this.selectedImage.name;
      }
      this.sourceImage = 'http://localhost:8080/images/'+ this.article.imageName;
      // this.sourceImage = 'https://spread-it.fr/images/'+ this.article.imageName;
    });

  }

  //Télécharge l'image dans le back end
  onUpload(): void {
    if (this.selectedImage) {
        this.service.uploadImage(this.selectedImage, this.article.userId).subscribe(response =>
            console.log(response)
        );
    }
  }

  upload(event:any) {
    let image: File = event.target.files[0]
    console.log(`Image size before compressed: ${image.size} bytes.`)

    this.compressImage.compress(image)
      .pipe(take(1))
      .subscribe(compressedImage => {
       this.selectedImage = compressedImage;
       this.article.imageName = this.selectedImage.name;
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        // now you can do upload the compressed image 
      })
  }

}
