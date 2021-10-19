import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @Output() SignedIn = new EventEmitter<object>();
  
  //this is used to store email value
  email:string = "";

 // this is used to show errors in when email is invalid or - when the email input is left empty
  message:string = "";

  // this is used to show create account form when every thing seems correct
  showCreateAccount:boolean = false;

  constructor(private au: AuthService, private fs: AngularFirestore) { }
  ngOnInit(): void {
  }

  // this is used to check if the input value has the email format, if true it shows the next page, else it shows errors.
  pass(){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.email.length ==0){
      this.message = "🔔 Please fill in your email address";
      
    }else if (re.test(String(this.email).toLowerCase())){
      this.showCreateAccount= true;
    }
    else {
      this.message = "🔔 Please fill in a valid email address";
    }
    
  }

  signInGoogle() {
    this.au.signInWithGoogle().then((user)=>{
      
      let newUser:User = new User();
      newUser.uid = user.user.uid;
      newUser.email = user.user.email;
      newUser.firstName = user.user.displayName.split(" ")[0] ;
      newUser.lastName = user.user.displayName.split(" ")[1];
      newUser.photoUrl = user.user.photoURL;

      this.fs.collection('users').doc(user.user.uid).set(Object.assign({}, newUser)).then(()=>{
        this.SignedIn.emit({"1": true});
      })
    }).catch((e)=>{
      console.log(e);
      this.SignedIn.emit({"1": false});
    });;
    
  }

  logedIn(event: any) {
    this.SignedIn.emit({"1": true});
  }
}
