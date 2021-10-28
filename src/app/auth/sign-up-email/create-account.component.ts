import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {

  @Output() createdAndNowLoginIn =  new EventEmitter<object>();
  // this is used to store email variable that cames from sign-up component and then display it in this component
  @Input() email: string = '';

  // this is used for Google Recaptcha v2
  siteKey: string = '';

  //
  captcha = false;

  constructor(private authService: AuthService, private fs: AngularFirestore) {
    this.siteKey = '6LdNOqocAAAAADgo2zcsO4lp5MJV8HaIhngDFZZP';
  }

  ngOnInit(): void {}

  // this methode is used to register a new user with email using a the signUp methode of the authService
  register(f: any) {
    delete f.value.captcha;
    if (this.captcha){
      f.value.email = this.email;
      let data = f.value;
  
      let newUser:User = new User();
      newUser.email = data.email;
      newUser.firstName = data.firstname;
      newUser.lastName = data.lastname;
      newUser.photoUrl = "assets/avatar.png"
      this.authService
        .signup(data.email, data.password)
        .then((user) => {
          newUser.uid = user.user.uid;
          this.fs.collection('users').doc(user.user.uid).set(Object.assign({}, newUser))
            .then(() => {
              this.createdAndNowLoginIn.emit({"1": true});
            });
        })
        .catch((e) => {
          this.createdAndNowLoginIn.emit({"1": false});
          console.log(e);
        });
    }
    else{
      console.log("please prove that you are not a robot");
    }
   
  }

  resolved(event: any){
    this.captcha = true;
  }
}
