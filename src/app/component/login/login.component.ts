import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {role:'',id: 0, name: '', nickname: '', email: '', password: '', isLogged: false };
  showAlert: boolean = false;

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  login() {
    this.us.login(this.user.email, this.user.password).subscribe(
      (data: any) => {
        console.log("data : " + data);
        this.us.userlogged = data;
        if (this.us.userlogged === data) {
          this.showAlert = true;
          setTimeout(() => { this.router.navigate(['']) }, 2500)
        }
      },
      error => {
        alert('Mot de passe ou email incorrect');
      }
    );
  }


}
