import { Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() signup =  new EventEmitter<boolean>();
  @Output() continueWithEmail =  new EventEmitter<object>();
  email:string="";
  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
    this.signup.emit(true);
  }

  continuewithemail(){
    if(this.email != "")  {
      this.continueWithEmail.emit({"1":true, "2":this.email});
    }
    else{
      console.log("please fill in with your email");
    }
    
  }

}
