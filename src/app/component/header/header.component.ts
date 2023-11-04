import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Canal } from 'src/app/entity/canal';
import { AuthService } from 'src/app/service/auth.service';
import { CanalService } from 'src/app/service/canal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  canals: any[] = [];

  constructor(public userService: UserService, private canalService: CanalService, 
    private router: Router) {

  }
  ngOnInit(): void {
    this.canalService.getAllCanals().subscribe(
      (data) => {
        console.log(data)
        this.canals = data
      },
      (error) => {
        console.error('Erreur : ', error)
      }
    )
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]);
  }
  onClickProfil() {
    if (this.userService.userlogged !== undefined) {
      this.router.navigate(['/userProfil/' + this.userService.userlogged.id])
    }
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    console.log(canal.id)
    this.router.navigate(['/' + canal.id])

  }

}
