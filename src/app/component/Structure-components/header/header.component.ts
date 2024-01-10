import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from 'src/app/Interface/Role';
import { Canal } from 'src/app/entity/canal';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  canals: Canal [] = [];
  

  //articlesUser = "/articlesUser/' + this.userService.userlogged.id"

  constructor(public tokenService: TokenService, public userService: UserService, private canalService: CanalService, private router: Router) {}
  
  @Input()
  userlogged: User={
    role: Role.USER,
    id: 0,
    nickname: '',
    email: '',
    password: '',
    isLogged: false,
    canals: [],
    nbArticles :0
  }

  ngOnInit(): void {
    
    const id = this.userService.userId;
      this.userService.getUserById(id).subscribe((data : User) => {
        this.userlogged = data
        this.canals[0] = this.userlogged.canals[0];
        console.log('this.canals 1 : ' +this.canals[0].id)
        console.log('this.userlogged.canals.length : ' +this.userlogged.canals.length)
        this.fonction();
      })

      
      // this.userlogged = this.userService.userlogged !== undefined ? this.userService.userlogged : this.userlogged;
      // this.canals = this.userlogged.canals;
    
  }

  fonction(){
    for (let i = 1; i < this.userlogged.canals.length; i++) {
      this.canalService.getCanalById(<number><unknown>this.userlogged.canals[i]).subscribe((canal : Canal) => this.canals.push(canal));
    }

  }

  logout() {
    this.userService.logout();
    this.tokenService.clearToken();
    // setTimeout(() => {this.router.navigate(['']) }, 1500)
    // setTimeout(() => {window.location.reload()}, 1500)
  }

  onClickProfil() {
    this.router.navigate(['/profile/'])
  }

  changeCanal() {
    if (this.userlogged.canals.length == 0) {
      this.router.navigate(['/addCanal'])
    }else{
      this.router.navigate(['/canal'])
    }
    
  }

  listeCanaux() {
    this.router.navigate(['/canaux'])
  }

  onArticlesPerso(){
    this.router.navigate(['/articles'])
  }

  addArticle(){
    this.router.navigate(['textEditor'])
  }

  accueil(){
    this.router.navigate(['/'])
  }

  isUserPresent(canal: Canal): boolean {
    return canal.users.some(utilisateur => utilisateur.id === this.userlogged.id);
  }

  createCanal(){
    this.router.navigate(['addCanal'])
  }

}
