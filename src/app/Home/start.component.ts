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

  
}
