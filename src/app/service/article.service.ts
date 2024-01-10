import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Canal } from '../entity/canal';
import { Article } from '../entity/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  private url = 'http://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/articles';
  // private url = 'https://spread-it.fr/articles';
  article!: Article;
  selectedImage: string = '';

  constructor(private http: HttpClient) {}

  createArticle(article: Article): Observable<any> {
    console.log("user id avant POST : " + article.userId);
    return this.http.post(this.url, article);
  }

  updateArticle(article: Article): Observable<Article> {
    let id = article.id;
    console.log("user id : " + id);
    return this.http.put<Article>(`${this.url}/${id}`, article);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  getArticlesByUserId(id: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/user/${id}`);
  }

  getArticlesByDate(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/date`);
  }

  getArticlesByTopRated(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/noteMoy`);
  }

  getArticlesByMostCommented(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/nbAvis`);
  }

  deleteArticle(id: number) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  setSelectedImage(imageName: string) {
    this.selectedImage = imageName;
  }

  getSelectedImage() {
    return this.selectedImage;
  }

  // postFile(fileToUpload: File) {
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   console.log("FormData : " + formData)
  //   return this.http.post("http://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/images", formData)
  // }

  uploadImage(file: File, userId: number) :  Observable<File> {
    // Créez un FormData et ajoutez le fichier et l'ID de l'utilisateur
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId.toString());
    return this.http.post<File>('http://ec2-13-39-38-122.eu-west-3.compute.amazonaws.com:8080/images', formData)
    // return this.http.post<File>('https://spread-it.fr/images', formData);

  }
}