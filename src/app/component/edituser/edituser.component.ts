import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  user?: User;
  constructor(
    public userServ: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let id = this.route.snapshot.params['id'];
    this.userServ.getUserById(id).subscribe((data: any) => {
      this.user = data;
      if (this.user) {
        this.user.isLogged = true;
      }
    })
  }

  deconnexion() {
    if (this.user) {
      this.user.isLogged = false;
      // this.user=undefined;
      alert('vous avez été déconnecté');
      this.router.navigate(['/home']);
    }

  }

  saveChanges() {
    if (this.user) {
      this.userServ.updateUser(this.user!).subscribe(
        updateUser => {
          this.user = updateUser;
          this.user.isLogged=true;
          alert('Votre profil a été misa jour.');
        },
        error => {
          alert('Il y a eu une erreur pendant la mise à jour');
        }
      );
    }

  }

}
