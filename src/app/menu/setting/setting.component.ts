import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  user: User = new User();
  name: string = '';
  photoUrl: string = '';
  audio = new Audio();
  setting: number;
  backgroundColor: string;
  color: string;

  constructor(private userService: UserService) {
    this.backgroundColor = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--background-card');
    this.color = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-background');
  }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user) => {
      this.user = user;
      this.name = this.user.firstName + ' ' + this.user.lastName;
      this.photoUrl = this.user.photoUrl;
      if (this.user.setting) {
        this.setting = this.user.setting;
        document
          .getElementById(this.setting.toString())
          .style.setProperty('background-color', this.color);
      } else {
        this.user.setting = 1;
        this.userService.changeUserData(this.user);
        document.getElementById('1').style.backgroundColor = this.color;
      }
    });
  }

  changeSound(soundId: number) {
    switch (soundId) {
      case 1:
        document
          .getElementById('1')
          .style.setProperty('background-color', this.color);
        document
          .getElementById('2')
          .style.setProperty('background-color', this.backgroundColor);
        document
          .getElementById('3')
          .style.setProperty('background-color', this.backgroundColor);
        this.audio.src = 'assets/1.wav';
        this.audio.load();
        this.audio.play();
        this.user.setting = 1;
        break;
      case 2:
        document
          .getElementById('2')
          .style.setProperty('background-color', this.color);
        document
          .getElementById('1')
          .style.setProperty('background-color', this.backgroundColor);
        document
          .getElementById('3')
          .style.setProperty('background-color', this.backgroundColor);
        this.audio.src = 'assets/2.wav';
        this.audio.load();
        this.audio.play();
        this.user.setting = 2;

        break;
      case 3:
        document
          .getElementById('3')
          .style.setProperty('background-color', this.color);
        document
          .getElementById('2')
          .style.setProperty('background-color', this.backgroundColor);
        document
          .getElementById('1')
          .style.setProperty('background-color', this.backgroundColor);
        this.audio.src = 'assets/3.wav';
        this.audio.load();
        this.audio.play();
        this.user.setting = 3;
        break;
    }
    this.userService.changeUserData(this.user);
  }

  deleteUser() {
    // dialog first
    // if yes > this.userService.deleteUser();
    // if cancel > do nothing
    this.openPopupDialog();
    
  }
     close() {
      if( document.getElementById('myModal').style.display == 'block'){
        document.getElementById('myModal').style.setProperty('display', 'none');
      }

    }

    // When the user clicks the button, open the modal
    openPopupDialog() {
      document.getElementById('myModal').style.setProperty('display', 'block');
    }  

  
}
