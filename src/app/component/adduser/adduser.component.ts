import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  user: User = new User('',NaN, '', '', '', '', true);

  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private us: UserService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  Register(event: Event) {
    if (this.form) {
      this.us.createUser(this.form.value).subscribe((data) => console.log(data));
      console.log("L'utilisateur a été créé");

    }
    this.router.navigate(['']);
  }


}
