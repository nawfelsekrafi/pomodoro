import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private au: AngularFireAuth) { 
  }

  // this is used to (sign up - register) a new user in google fire base using email and password
  signup(email:string, password:string) {
    return this.au.createUserWithEmailAndPassword(email, password);
  }

  // this is used to (sign in - login) a new user in google fire base using email and password
  signIn(email:string, password:string) {
    return this.au.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle(){
    return this.au.signInWithPopup(new GoogleAuthProvider());
}


}
