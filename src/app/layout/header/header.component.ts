import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  //this is used to display sign-in component
  isSignInClicked: boolean = false;

  //this is used to display Home component
  isHomeClicked: boolean = true;
  
  //this is used to display sign-up component
  isSignUpClicked: boolean = false;

  // this is used to display "sign in with email" component
  isSignEmail: boolean = false;

  //this value is used when user choose to log in with email.
  email:string= "";

  //
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  // this methode is used to display the Sign in Component after the click of "Sign in button in to header component".
  signIn() {
    this.isSignUpClicked = false;
    this.isHomeClicked = false;
    this.isSignInClicked = true;
    this.isSignEmail = false;
  }

  // this methode is used to display Home- The Landing Page- component after the click of "the title or the icon
  // in the Header component".
  home() {
    this.isSignUpClicked = false;
    this.isSignInClicked = false;
    this.isHomeClicked = true;
    this.isSignEmail = false;
  }

  //this methode is used to display sign Up component after the click of "sign up in the Header component"
  signUp() {
    this.isHomeClicked = false;
    this.isSignInClicked = false;
    this.isSignUpClicked = true;
    this.isSignEmail = false;
  }

  // this methode is used to display sign Up component after the click of "sign up in the sign-in component"
  runMessage(event: any) {
    if (event) {
      this.isSignUpClicked = true;
      this.isSignInClicked = false;
      this.isSignEmail = false;
    }
  }

  // this methode is used to display "Log in with email " after the click of "continue with Email in the sign-in component"
  showContinueWithEmail(event: any) {
    let emailInputNotEmpty = event["1"];
    let emailValue = event["2"];

    if (emailInputNotEmpty) {
      this.isSignInClicked = false;
      this.isSignUpClicked = false;
      this.isSignEmail = true;
      this.email = emailValue;
    }
  }

  //this methode is used to display "Log in Principale Page " after the click of "Not you?  in the sign-in-with-email component"
  turnBack(event: any){
    if (event["1"] == true){
      this.isSignUpClicked = false;
      this.isHomeClicked = false;
      this.isSignInClicked = true;
      this.isSignEmail = false;
    }
  }

  SignedIn(event: any) {
    this.loggedIn.emit(event["1"]);
  }
}

