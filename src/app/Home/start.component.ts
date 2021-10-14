import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {

  toggleSwitch: any = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

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

  constructor() {
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

  ngOnInit(): void {}

  dashboard: boolean = false;
  timer: boolean = false;
  settings: boolean = false;
  about: boolean = false;
  projects: boolean = true;
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
