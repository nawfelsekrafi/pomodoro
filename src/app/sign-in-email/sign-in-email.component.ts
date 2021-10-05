import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in-email',
  templateUrl: './sign-in-email.component.html',
  styleUrls: ['./sign-in-email.component.css']
})
export class SignInEmailComponent implements OnInit {

  @Output() signin =  new EventEmitter<boolean>();
  @Input() email:string="";
  siteKey:string="";
  constructor(private au: AuthService) { 
    this.siteKey="6LdNOqocAAAAADgo2zcsO4lp5MJV8HaIhngDFZZP"
  }

  ngOnInit(): void {
  }

  signInEmail(f: any) {
    f.value.email = this.email;
    let data = f.value;
    this.au.signIn(data.email, data.password).then(()=>{
      console.log("Yes logged in ");
    }).catch(()=>{
      console.log("an error has been occured!");
    })
  }

  notyou(){
    this.signin.emit(true);
  }

}
