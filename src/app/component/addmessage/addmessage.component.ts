import { Component, EventEmitter, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanalService } from 'src/app/service/canal.service';

import { MessageService } from 'src/app/service/message.service';



@Component({

  selector: 'app-addmessage',

  templateUrl: './addmessage.component.html',

  styleUrls: ['./addmessage.component.css']

})

export class AddmessageComponent {
  form: FormGroup;
  @Output() RefreshEmitter = new EventEmitter;

  constructor(
    private fb: FormBuilder,
    private ms: MessageService,
    private cs : CanalService
    
  ) {

    this.form = this.fb.group({
      messageContent: ['', {
        validators: [
          Validators.required, Validators.minLength(1)
        ],
      }]

    })

  }



  onClick() {
    if (this.form.value.messageContent !== undefined) {
      this.ms.createMessages(this.form.value.messageContent).subscribe(
        (response) => {
          console.log('Message created successfully:', response);
          this.form.reset();
          this.RefreshEmitter.emit();
        },
        (error) => {
          console.error('Error creating canal:', error);
        }
      );
    } else {
      console.error('Message content is undefined');
    }
  }

  refresh(){
    this.ms.getMessagesByCanalId(this.cs.canalUsed.id);

  }


}