import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sign-in-email',
  templateUrl: './sign-in-email.component.html',
  styleUrls: ['./sign-in-email.component.css'],
})
export class SignInEmailComponent implements OnInit {

  // this output is used to turn back to login page when user clicked at "Not You?"
  @Output() signin = new EventEmitter<object>();

  // this input is used to store email value that cames from "log in to pomoguru page" and display at the top of the pages
  @Input() email: string = '';

  // this is used for Google Recaptcha v2
  siteKey: string = '';

  // this is used to hide and show password 
  isActive:boolean = true;

  // this is used to show errors in login operation 
  message:string = "";

  constructor(private au: AuthService) {
    this.siteKey = '6LdNOqocAAAAADgo2zcsO4lp5MJV8HaIhngDFZZP';
  }

  ngOnInit(): void {}

  // this methode is used to sign in with email using a the signIn methode of the authService 
  signInEmail(f: any) {
    f.value.email = this.email;
    let data = f.value;
      this.au
      .signIn(data.email, data.password)
      .then(() => {
        console.log('Yes logged in ');
      })
      .catch(() => {
        this.message = "⚠ Try again with a registred email! ⚠"
      });
    
  }

  // this methode is used to turn back to Login Page by using an event emitter named signin when user click on Not You?
  notyou() {
    this.signin.emit({"1":true});
  }

  //his methode is used to show and hide password 
  showpassword() {
    this.isActive = !this.isActive;
  }
}
