import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';
import { IToken } from '../../../Interface/IToken';
import { TokenService } from 'src/app/service/token.service';
import { Role } from 'src/app/Interface/Role';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {role:Role.USER,id: 0, nickname: '', email: '', password: '', isLogged: false, canals: [] , nbArticles:0};
  showAlert: boolean = false;
  mpForgot: boolean = false;
  mpChange: boolean = false;

  form: FormGroup;
  constructor(private contactService : ContactService, private tokenService: TokenService, private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  login() {
    this.us.loginUser(this.user.email, this.user.password).subscribe(
      data => {
        console.log(data.accessToken),
        console.log('User id : ' + data.user.id),
        this.tokenService.saveToken(data.accessToken),
        this.us.userlogged = data.user,
        setTimeout(() => {window.location.reload()}, 500),
         this.router.navigate([''])
         
        },
      
      error => {
        alert('Mot de passe ou email incorrect');
      }
    );
  }

  motDdePasseOublie(){
    this.mpForgot = true;
  }

  nouveauMP(){
    this.mpForgot = false;
    this.mpChange = true;
    this.contactService.sendEmail(this.user.email)
    .subscribe(data => {
      console.log('Token : ' + data.accessToken),
      console.log('User id : ' + data.user.id),
      this.tokenService.saveToken(data.accessToken)
      // this.us.userlogged = data.user,
      // setTimeout(() => {window.location.reload()}, 500),
      //  this.router.navigate([''])
       
      },
    
    error => {
      alert('Mot de passe ou email incorrect');
    }
  );
  }


}
