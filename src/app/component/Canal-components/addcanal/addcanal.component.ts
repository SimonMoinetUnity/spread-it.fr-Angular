import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Role } from 'src/app/Interface/Role';
import { Canal } from 'src/app/entity/canal';
import { User } from 'src/app/entity/user';
import { CanalService } from 'src/app/service/canal.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css']
})
export class AddcanalComponent {

  showAlert = false;

  form: FormGroup;
  //@Output() RefreshEmitter = new EventEmitter;

  constructor(private localStorageService : LocalStorageService, private fb: FormBuilder, private cs: CanalService, private router: Router, private userService: UserService) {

    this.form = this.fb.group({
      canalname: ['', [Validators.required, Validators.maxLength(25)]],
      canalMembres: ['', [Validators.required, Validators.maxLength(200)]],
    })
  }

  userList: string = '';
  utilisateurs: string[] = [];

  canal: Canal = new Canal(NaN, '', [], 0);
  user: User = new User(NaN, NaN, '', '', '', true, [], 0);
  connectedUser!: User;

  ngOnInit(){
    const valeur_id = localStorage.getItem('UserId');
    
    if (valeur_id !== null) {
      const userId = parseInt(valeur_id); 
      this.userService.getUserById(userId).subscribe((data : User) => {this.connectedUser = data});
    }

  }


  onClick() {
    this.canal.users.push({ id: this.connectedUser.id, role: NaN, nickname: '', email: '', password: '', isLogged: false, canals: [], nbArticles : 0 });
      

    this.canal.name = this.form.value.canalname;
    console.log('canal name : ' + this.canal.name);

      this.canal.adminId = this.connectedUser.id;
      console.log('this.canal.adminId : ' + this.canal.adminId )
    
    

    this.utilisateurs = this.form.value.canalMembres.split(',').map((user: string) => user.trim());

    // Créer un tableau d'observables pour les appels asynchrones
    const observables = this.utilisateurs.map((userNickname: string) => {
      return this.userService.getUserIdByNickname(userNickname);
    });

    // Utiliser forkJoin pour attendre la fin de tous les appels asynchrones
    forkJoin(observables).subscribe((data: any[]) => {
      
      for (let i = 0; i < data.length; i++) {
        const userId = data[i];
        this.canal.users.push({ id: userId, role: NaN, nickname: '', email: '', password: '', isLogged: false, canals: [], nbArticles:0 });
        console.log('Id du User ajouté : ' + this.canal.users[i].id);
      }

      // Après avoir obtenu tous les IDs, créer le canal
      this.cs.createCanal(this.canal).subscribe(createdCanal => {
        console.log('Canal créé', createdCanal);
        this.showAlert = true;
        //setTimeout(() => {window.location.reload()}, 2500)
        this.localStorageService.setItem('CanalId', (createdCanal.id).toString());
        setTimeout(() => { this.router.navigate(['/canal']) }, 2500)
      });
      
    });


  }



  // addUsersToCanal(): void {
  //   console.log('AddUsersToCana appelée');
  //   this.utilisateurs = this.form.value.canalMembres.split(',').map((user: string) => user.trim());

  //   for (let i = 0; i < this.utilisateurs.length; i++) {
  //     const userNickname = this.utilisateurs[i];
  //     this.userService.getUserIdByNickname(userNickname).subscribe(data => this.user.id = data);
  //     this.canal.users.push(this.user);

  //   }
  //   console.log('User jaouté : ' + this.user);
  // }


}
