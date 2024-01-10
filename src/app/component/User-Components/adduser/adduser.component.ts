import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  Register() {

  // Vérification de l'existence du nickname
  this.us.checkNicknameAvailability(this.form.value.nickname)
  .subscribe(
    () => {
      // Le nickname est disponible, créer l'utilisateur
      this.us.createUser(this.form.value.nickname, this.form.value.email, this.form.value.password)
        .subscribe(() => {
          console.log("L'utilisateur a été créé et connecté avec succès");
          this.router.navigate(['']);
        }, error => {
          console.error("Une erreur s'est produite lors de la création de l'utilisateur :", error);
        });
    },
    nicknameError => {
        // Le nickname existe déjà, mettre à jour le formulaire avec une erreur
        console.error("Le nickname existe déjà :", nicknameError);
        this.form.get('nickname')?.setErrors({ 'nicknameExists': true });
      }
  );
    
  }


}
