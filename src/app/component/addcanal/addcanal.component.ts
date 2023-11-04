import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanalToCreate } from 'src/app/entity/canaltocreate';
import { CanalService } from 'src/app/service/canal.service';

@Component({
  selector: 'app-addcanal',
  templateUrl: './addcanal.component.html',
  styleUrls: ['./addcanal.component.css']
})
export class AddcanalComponent {

  showAlert = false;

  form: FormGroup ;
  @Output() RefreshEmitter = new EventEmitter;
  
constructor(

    private fb: FormBuilder,
    private cs: CanalService,
    private router: Router) {
    this.form = this.fb.group({
      canalname: ['', [Validators.required, Validators.maxLength(25)]],

    })
  }
  onClick() {
    console.log(this.form.value)
    let newCanal = new CanalToCreate(this.form.value.canalname)
    console.log(newCanal)


  }

}
