import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string = "";
  message:string = "";
  showCreateAccount:boolean = false;

  constructor() { }
  ngOnInit(): void {
  }

  pass(){
    if(this.email.length !=0){
      this.showCreateAccount= true;
    }
    else {
      this.message = "Please fill in your email address"
    }
    
  }
}
