import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { getAuth } from "firebase/auth";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid: string;
  user: User  = new User();
  private userData = new BehaviorSubject<User>(this.user);
  currentUserData = this.userData.asObservable();
  
  constructor(private fs: AngularFirestore, private auth: AuthService) {}


  /* getUserAllData(): any {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.uid = user.uid;
    }
    return this.fs.collection("users", ref => ref.where("uid", "==", this.uid)).valueChanges();
  } */

  gotUserAllData() {
    // this is for getting the id of the current Logged User 
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.uid = user.uid;
    }
    // this is for getting user data and store them in a behavior Subject then let every component need data to read up-to-date data
    this.fs.collection("users", ref => ref.where("uid", "==", this.uid)).valueChanges().subscribe((data:any) => {
      this.user =  data[0];
      this.userData.next(this.user);
  });

}
  /*
  updateUserData(user : User): Observable<any> {
    return of(this.fs.doc(`users/${this.uid}`).set(user));
  } */

  changeUserData(user: User) {
    this.userData.next(user);
    return of(this.fs.doc(`users/${this.uid}`).set(user));
  }

  DeleteUser() {
    this.fs.doc(`users/${this.uid}`).delete().catch(error => console.log(error)).then(() => console.log(`${this.user.uid} has been deleted.`));
    this.auth.signOut();
  }

}