import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { getAuth } from "firebase/auth";
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid: string;

  constructor(private fs: AngularFirestore) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.uid = user.uid;
    }
   }

  getUserAllData(): any {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.uid = user.uid;
    }
    return this.fs.collection("users", ref => ref.where("uid", "==", this.uid)).valueChanges();
  }

  updateUserData(user : User): Observable<any> {
    return of(this.fs.doc(`users/${this.uid}`).set(user));
  }

}