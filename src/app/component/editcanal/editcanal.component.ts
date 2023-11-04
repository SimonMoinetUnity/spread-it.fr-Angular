import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editcanal',
  templateUrl: './editcanal.component.html',
  styleUrls: ['./editcanal.component.css']
})
export class EditcanalComponent {
  canals: any[] = [];


  constructor(private cs: CanalService, private us: UserService, private ms: MessageService) {

    this.cs.getAllCanals().subscribe(
      (data) => {
        console.log(data)
        this.canals = data
      },
      (error) => {
        console.error('Erreur : ', error)
      }
    )
  }

  onClickDelete(id: number) {
    this.cs.deleteCanal(id)
    console.log(this.canals)
  }

  getUserByCanal(i: number) {
    let usersInCurrentCanal: Set<any> = new Set(); // Initialisez l'ensemble ici
    let messagesInCurrentCanal = this.ms.getMessagesByCanalId(i);

    messagesInCurrentCanal.forEach((data) => {
      data.forEach((elem) => {
        usersInCurrentCanal.add(elem.user);
      });
    });
    console.log(usersInCurrentCanal)
    return usersInCurrentCanal;
  }

  ngOnInit(): void {
    this.cs.getAllCanals().subscribe(
      (data) => {
        console.log(data)
        this.canals = data
      },
      (error) => {
        console.error('Erreur : ', error)
      }
    )
    console.log(this.canals)
  }




}
