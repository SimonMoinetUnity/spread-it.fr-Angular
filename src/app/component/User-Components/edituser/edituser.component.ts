import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent {

  

  @Input()
  user: User={
    role: Role.USER,
    id: 0,
    nickname: '',
    email: '',
    password: '',
    isLogged: false,
    canals: [],
    nbArticles :0
  }

  constructor(public userServ: UserService, private route: ActivatedRoute,private router: Router) {}

  customStyle = {
     backgroundColor: "#ffffff",
    border: "1px solid #7e7e7e",
    borderRadius: "50%",
    color: "#7e7e7e",
    cursor: "pointer"
  };

  ngOnInit(): void {

    const id = this.userServ.userId;
    
    this.userServ.getUserById(id).subscribe((data: any) => {
        this.user = data;
        if (this.user) {
          this.user.isLogged = true;
        }
        if (this.user.nbArticles == null) {
          this.user.nbArticles = 0;
        }
      })
    
      // this.user = this.userServ.userlogged !== undefined ? this.userServ.userlogged : this.user;
       

  }

  deconnexion() {
    if (this.user) {
      this.user.isLogged = false;
      // this.user=undefined;
      alert('vous avez été déconnecté');
      this.router.navigate(['/home']);
    }

  }

}
