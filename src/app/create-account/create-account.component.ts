import { Component, OnInit, Input } from '@angular/core';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  @Input() email:string= "";
  firstName: string | undefined;
  lastname: string | undefined;
  password:  string | undefined;
  siteKey:string="";

  createAccount() {
   /* 
    let user = new User (this.firstName, this.lastname, this.email, this.password);
    this.userService.createAccount(user);
    */
  }

  constructor(private authService : AuthService) { 
    this.siteKey="6LdNOqocAAAAADgo2zcsO4lp5MJV8HaIhngDFZZP"
  }
  ngOnInit(): void {
  }

  register(f: any){
    
    //delete f.value.captcha;  
    f.value.email = this.email;
    console.log(f.value);
    let data = f.value;
    this.authService.signup(data.email, data.password).
    then(()=>{console.log("done")}).catch(e =>{
      if ( e == "auth/email-already-in-use") {
        console.log("hi");
      }
    });
    
  }

}
