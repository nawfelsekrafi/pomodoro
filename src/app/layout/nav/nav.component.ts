import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() page = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  dash(){
    this.page.emit("dashboard");
  }
  
  projects(){
    this.page.emit("projects");
  }
  timer(){
    this.page.emit("timer");
  }
  settings(){
    this.page.emit("settings");
  }
  about(){
    this.page.emit("about");
  }
 


}
