import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() SignedIn = new EventEmitter<object>();

  // this is used to send value true to the header component to show then sign up page 
  @Output() signup =  new EventEmitter<boolean>();

  // this is used to send a event to the header component to show login with email .. 
  // the event contains tow values the first to know if "continue with email " button is clicked or not to show then 
  // the right page.
  // and the second value is "the email " value to use it later in logging in.
  @Output() continueWithEmail =  new EventEmitter<object>();

  // this is used to save email value and used it later to log in by email and password
  email:string="";

  // this is used to show errors when they occured
  message:string = "";

  constructor(private au: AuthService, private fs: AngularFirestore, private userService: UserService) { }

  ngOnInit(): void {
  }

  // when user click on this methode sign up page shows up.
  signUp(){
    this.signup.emit(true);
  }

  // this is used to check if the input value has the email format, if true it send the "continueWithEmail" event,
  // else it shows errors.
  continuewithemail(){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.email.length ==0){
      this.message = "🔔 Please fill in your email address";
      
    }else if (re.test(String(this.email).toLowerCase())){
      this.continueWithEmail.emit({"1":true, "2":this.email});
    }
    else {
      this.message = "🔔 Please fill in a valid email address";
    }
    
  }

  signInGoogle() {

    this.au.signInWithGoogle().then((user)=>{

      this.fs.collection('users').doc(user.user.uid).get().subscribe((data:any) => {
        if (data.exists){
          console.log("exits");
          this.SignedIn.emit({"1": true});
        }else {
          console.log("Not exits");
          this.fs.collection('users').doc(user.user.uid).set({
            uid: user.user.uid,
            email: user.user.email,
            firstName :  user.user.displayName.split(" ")[0],
            lastName : user.user.displayName.split(" ")[1],
            photoUrl : user.user.photoURL
          }).then(()=>{
            this.SignedIn.emit({"1": true});
          })

        }
        })
        
         
      }).catch((e)=>{
      console.log(e);
      this.SignedIn.emit({"1": false});
    })
  }

}


