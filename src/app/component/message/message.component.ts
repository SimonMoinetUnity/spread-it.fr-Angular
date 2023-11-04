import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/entity/message';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() messageList!: Message[];
  @Output() RefreshEmitter = new EventEmitter;
  today = new Date();


  constructor(public us: UserService, public ms: MessageService) {
  }


  selectPrevMessage() {
    const currentElementInMessageListIndex = this.messageList.findIndex((element) => element === this.message);
    let prevMessage;
    if (this.messageList[currentElementInMessageListIndex] === this.message) {
      for (let i = currentElementInMessageListIndex - 1; i >= 0; i--) {
        if (this.messageList[i]) {
          prevMessage = this.messageList[i];
        }
      }
    }
    return prevMessage;
  }

  isSameDate(): any {
    const currentElementInMessageListIndex = this.messageList.findIndex((element) => element === this.message);
    let prevMessage;
    if (this.messageList[currentElementInMessageListIndex] === this.message) {
      for (let i = currentElementInMessageListIndex - 1; i >= 0; i--) {
        if (this.messageList[i]) {
          prevMessage = this.messageList[i];
          let date1 = new Date(this.message.date)
          let date2 = new Date(prevMessage.date)

          const date1Day = date1.getDate()
          const date1Month = date1.getMonth()
          const date1Year = date1.getFullYear()

          const date2Day = date2.getDate()
          const date2Month = date2.getMonth()
          const date2Year = date2.getFullYear()

          if (date1Day === date2Day
            && date1Month === date2Month
            && date1Year === date2Year) {
            return true;
          }
          else return false;
        }
      }
    }
  }


  deleteMessage(id: number) {
    this.ms.deleteMessageById(id).subscribe(
      response => {
        console.log(response);
        this.messageList = this.messageList.filter(msg => msg.id !== id); 
        this.RefreshEmitter.emit();
      },
      error => {
        console.error("Error deleting the message:", error); 
      }
    );
  }

  ngOnInit() {
  }

}
