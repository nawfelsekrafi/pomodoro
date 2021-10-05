import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private au: AngularFireAuth) { 
  }

  signup(email:string, password:string) {
    return this.au.createUserWithEmailAndPassword(email, password);
  }

  signIn(email:string, password:string) {
    return this.au.signInWithEmailAndPassword(email, password);
  }


}
