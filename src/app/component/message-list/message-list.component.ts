import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/entity/message';
import { Canal } from 'src/app/entity/canal';
import { CanalService } from 'src/app/service/canal.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messagesToDisplay: Message[] = [];
  connectedUser: User | undefined = this.userService.userlogged;
  canalUsed: Canal = this.canalService.canalUsed;

  messageList!: Message[] | null;
  canals: any[] = [];



  constructor(private messageService: MessageService, private canalService: CanalService, 
    private userService: UserService, private router: Router) {
this.refresh();
    
  }



  ngOnInit() {
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


  getCanalId(message: Message) {
    return message.canal;
  }


  displayFullMessage(messagelist: Message[]) {
    for (let message of messagelist) {
      console.log(message.date + " - " + message.content + " - " + message.user.id)
    }
  }

  changeCanal(canal: Canal) {
    this.canalService.canalUsed = canal;
    console.log(canal.id)
    this.router.navigate(['/' + canal.id])

  }

refresh(){
  let id: number = this.canalUsed.id; // on récupère le canal used pour filtre les messages
    this.messageService.getMessagesByCanalId(this.canalUsed.id).subscribe((data) =>

      this.messagesToDisplay = data
      // console.log(this.displayFullMessage(this.messagesToDisplay));

    )
}

}
