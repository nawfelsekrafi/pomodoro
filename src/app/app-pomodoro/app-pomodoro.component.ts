import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-pomodoro',
  templateUrl: './app-pomodoro.component.html',
  styleUrls: ['./app-pomodoro.component.css']
})
export class AppPomodoroComponent implements OnInit {

  loggedIn: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  checkIsLoggedIn(event: any){
    if (event == true){
      this.loggedIn = true;
    }
  }

}
