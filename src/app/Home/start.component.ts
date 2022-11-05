import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  currentPage: String = 'timer';

  toggleSwitch: any = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  constructor(private userService: UserService) {

    var currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem("'theme")
      : null;
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        this.toggleSwitch.checked = true;
      }
    }
  }

  day: boolean = true;

  switchTheme(e: any) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.day= false;
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.day = true;
    }
  }

  ngOnInit(): void {
    this.userService.gotUserAllData();
  }

  changePage(event: any){
    switch(event) {
      case "dashboard":
        this.currentPage = 'dashboard';
        break;
      case "settings":
        this.currentPage = 'settings';
        break;
      case "about":
        this.currentPage = 'about';
        break;
      case "projects":
        this.currentPage = 'projects';
        break;
      case "timer":
        this.currentPage = 'timer';
        break;
    }
  }
  
}
