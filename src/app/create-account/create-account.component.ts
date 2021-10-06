import { Component, OnInit, Input } from '@angular/core';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  // this is used to store email variable that cames from sign-up component and then display it in this component
  @Input() email:string= "";

  // this is used for Google Recaptcha v2
  siteKey:string="";

  constructor(private authService : AuthService) { 
    this.siteKey="6LdNOqocAAAAADgo2zcsO4lp5MJV8HaIhngDFZZP"
  }

  ngOnInit(): void {
  }

  
  // this methode is used to register a new user with email using a the signUp methode of the authService 
  register(f: any){
    delete f.value.captcha;  
    f.value.email = this.email;
    let data = f.value;
    
    this.authService.signup(data.email, data.password).
    then(()=>{console.log("done")}).catch((e) =>{
      console.log(e);
      console.log("**********");
      console.log(e.message);
      console.log("**********");
      console.log(e.data);
    });
    
  }

}
