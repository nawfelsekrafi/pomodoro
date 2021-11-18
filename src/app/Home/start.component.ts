import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {

  dashboard: boolean = false;
  timer: boolean = true;
  settings: boolean = false;
  about: boolean = false;
  projects: boolean = false;

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
        this.dashboard = true;
        this.timer = false;
        this.about = false;
        this.projects = false;
        this.settings = false;
        break;
      case "settings":
        this.dashboard = false;
        this.timer = false;
        this.about = false;
        this.projects = false;
        this.settings = true;
        break;
      case "about":
        this.dashboard = false;
        this.timer = false;
        this.about = true;
        this.projects = false;
        this.settings = false;
        break;
      case "projects":
        this.dashboard = false;
        this.timer = false;
        this.about = false;
        this.projects = true;
        this.settings = false;
        break;
      case "timer":
        this.dashboard = false;
        this.timer = true;
        this.about = false;
        this.projects = false;
        this.settings = false;
        break;
    }
  }
  
}
