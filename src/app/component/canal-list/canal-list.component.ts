import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanalService } from 'src/app/service/canal.service';
import { Canal } from 'src/app/entity/canal';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-canal-list',
  templateUrl: './canal-list.component.html',
  styleUrls: ['./canal-list.component.css']
})
export class CanalListComponent implements OnInit {

  canals: any[] = [];
  @Output() canalEvent = new EventEmitter<number>();

  constructor(
    private canalService: CanalService,
    private router: Router,
    public userService: UserService, public authService: AuthService
  ) {

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

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    console.log(canal.id)
    this.router.navigate(['/' + canal.id])

  }

  deleteCanal() {
    this.router.navigate(['/edit'])

  }
}
