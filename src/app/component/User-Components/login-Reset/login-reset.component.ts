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
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.css']
})
export class LoginResetComponent {

  user: User = {role:Role.USER,id: 0, nickname: '', email: '', password: '', isLogged: false, canals: [] , nbArticles:0};
  mpDifferents: boolean = false;
  mpForgot: boolean = false;
  mpChange: boolean = false;

  form: FormGroup;
  constructor(private tokenService: TokenService, private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      password1: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(){
    const valeur_id = localStorage.getItem('UserId');
    if (valeur_id !== null) {
      const userId = parseInt(valeur_id); 
      this.us.getUserById(userId).subscribe((data) => {
        this.user = data
      })
    }
  }

  submit() {
    // this.us.loginUser(this.user.email, this.user.password).subscribe(
    //   data => {
    //     console.log(data.accessToken),
    //     console.log('User id : ' + data.user.id),
    //     this.tokenService.saveToken(data.accessToken),
    //     this.us.userlogged = data.user,
    //     setTimeout(() => {window.location.reload()}, 500),
    //      this.router.navigate([''])
         
    //     },
      
    //   error => {
    //     alert('Mot de passe ou email incorrect');
    //   }
    // );

    if (this.form.value.password1 == this.form.value.password2) {
      this.user.password=this.form.value.password1;
      console.log('Nouveau MP : ' + this.user.password)

      this.us.updateUser(this.user).subscribe(
       (data : User) => {
        console.log('EMAIL : ' + data.email),
        console.log('MP : ' + data.password)
        this.router.navigate([''])
      });
      
    } else {
      this.mpDifferents = true;
    }

    

  }


}
