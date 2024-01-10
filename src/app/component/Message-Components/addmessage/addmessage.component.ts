import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  canalId!:number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,private ms: MessageService,private cs : CanalService) {

    this.form = this.fb.group({
      messageContent: ['', { validators: [ Validators.required, Validators.minLength(1) ],}]
    })

    const valeur_id = localStorage.getItem('CanalId');
      if (valeur_id !== null) {
        this.canalId = parseInt(valeur_id); 
      }

  }

  onClick() {
    if (this.form.value.messageContent !== undefined) {
      this.ms.createMessages(this.form.value.messageContent, this.canalId).subscribe(
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

  // refresh(){
  //   let id = this.route.snapshot.params['id'];
  //   this.ms.getMessagesByCanalId(id);
  // }


}