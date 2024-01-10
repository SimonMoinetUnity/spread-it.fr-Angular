import { Component, Input } from '@angular/core';
import { Canal } from 'src/app/entity/canal';
import { Message } from 'src/app/entity/message';
import { CanalService } from 'src/app/service/canal.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-canal-card',
  templateUrl: './canal-card.component.html',
  styleUrls: ['./canal-card.component.css']
})
export class CanalCardComponent {
  @Input() canal!: Canal;
  last3Messages: any[] = [];
  lastMessages: any[] = [];
  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getMessagesByCanalId(this.canal.id).subscribe((data) => {
      this.getLastMessages(data)
    });
  }

  getLastMessages(data: any[]) {
    console.log(data)
    let counter = 0;
    if (data.length > 0) {
      for (let i = data.length - 1; counter <= 2; i--) {
        this.last3Messages.push(data[i])
        counter++
      }
    }

  }


}
