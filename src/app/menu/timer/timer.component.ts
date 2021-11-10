import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { WorkingSession } from 'src/app/models/working-session';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit  {

  isStart: boolean = false;
  isPause: boolean = false;
  time: number = 1 * 10;
  now: number = 0;
  minutes: string = '00';
  seconds: string = '00';
  isBreakTime: boolean = false;
  isSetting: boolean = true;
  isFocusTime: boolean = true;
  count: number = 0;
  isStop: boolean = false;

  projects: Project[] = [];
  user: User = new User();
  showListOfProjects:boolean = false;
  selectedProjectId:string = '';
  workingSessions: WorkingSession[] = [];

  constructor(private userService: UserService) {}

  // this methode is used to select and save a project from the drop down list
  selectChangeHandler(event: any){
    this.selectedProjectId = event.target.value;
  }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user) => {
      this.user = user;
      if (this.user.projects) {
        this.projects = this.user.projects;
      } else {
        this.projects = [];
      }
      if (this.user.workingSessions) {
        this.workingSessions = this.user.workingSessions;
      }else {
        this.workingSessions = [];
      }
    });
  }
  

  start(): void {
    // this is the logic of working time 
    if (this.selectedProjectId !== '' && this.showListOfProjects){
      this.isStart = true;
      var interval = setInterval(() => {
        if (this.time > 0) {
          this.now++;
          var timeleft: number = this.time - this.now;
          var min = Math.floor(timeleft / 60);
          this.minutes = min < 10 ? '0' + min : min.toString();
          var sec = Math.floor(timeleft - min * 60);
          this.seconds = sec < 10 ? '0' + sec : sec.toString();
          if (sec == 11 && min < 1) {
            this.playAudioFinishBreak();
          }
          if ((min == 0 && sec == 0) ||this.isPause || this.isBreakTime || this.isFocusTime
          ) {
            if (min == 0 && sec == 0) {              
              this.saveWorkingSession();
              this.playFinishSound();
              this.count = 1;
              this.time = 0;
              this.isFocusTime = true;
              this.isSetting = true;
              this.isStart = false;
            }
            clearInterval(interval);
          }
        }
      }, 1000);
    }else if (this.showListOfProjects) {
      console.log("please select a project")
    }
    // this is the logic of break time 
    else {
      this.isStart = true;
      var interval = setInterval(() => {
        if (this.time > 0) {
          this.now++;
          var timeleft: number = this.time - this.now;
          var min = Math.floor(timeleft / 60);
          this.minutes = min < 10 ? '0' + min : min.toString();
          var sec = Math.floor(timeleft - min * 60);
          this.seconds = sec < 10 ? '0' + sec : sec.toString();
          if (sec == 11 && min < 1) {
            this.playAudioFinishBreak();
          }
          if ((min == 0 && sec == 0) ||this.isPause || this.isBreakTime || this.isFocusTime
          ) {
            if (min == 0 && sec == 0) {              
              this.playFinishSound();
              this.count = 1;
              this.time = 0;
              this.isFocusTime = true;
              this.isSetting = true;
              this.isStart = false;
            }
            clearInterval(interval);
          }
        }
      }, 1000);
    }

  }
  playFinishSound() {
    let audio = new Audio();
    audio.src = '../assets/'+ this.user.setting + '.wav';
    audio.load();
    audio.play(); 
  }

  pause(): void {
    this.isPause = true;
  }

  resume(): void {
    this.isPause = false;
    this.start();
  }

  add() {
    this.count++;
    this.time = this.count * 60;
    var timeleft = this.time - this.now;
    var min = Math.floor(timeleft / 60);
    this.minutes = min < 10 ? '0' + min : min.toString();
    var sec = Math.floor(timeleft - min * 60);
    this.seconds = sec < 10 ? '0' + sec : sec.toString();
  }

  sub() {
    if (this.count > 0) {
      this.count--;
      this.time = this.count * 60;
      var timeleft = this.time - this.now;
      var min = Math.floor(timeleft / 60);
      var sec = Math.floor(timeleft - min * 60);
      this.minutes = min < 10 ? '0' + min : min.toString();
      this.seconds = sec < 10 ? '0' + sec : sec.toString();
    }
    if (this.count <= 0) {
      this.seconds = '00';
      this.minutes = '00';
      this.count = 0;
    }
  }

  save() {
    this.time = this.count * 60;
    this.isBreakTime = false;
    this.isSetting = false;
    this.isFocusTime = false;
    this.isStart = false;
  }

  stop() {
    this.isFocusTime = true;
    this.time = 0;
    this.count = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.now = 0;
    this.isBreakTime = false;
    this.isStop = true;
    this.isSetting = true;
    this.selectedProjectId ='';
  }

  back() {
    this.time = 0;
    this.count = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.now = 0;
    this.isBreakTime = false;
    this.isSetting = true;
    this.isFocusTime = true;
    this.selectedProjectId ='';
  }

  next() {
    this.time = this.count * 60;
    this.isFocusTime = false;
    this.isSetting = false;
    this.isStart = false;
    this.isBreakTime = false;
    this.showListOfProjects = true;
  }

  cancel() {
    this.time = 0;
    this.count = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.now = 0;
    this.isFocusTime = false;
    this.isBreakTime = true;
    this.selectedProjectId ='';
  }

  playAudioFinishBreak() {
    let audio = new Audio();
    audio.src = '../assets/finishBreakAudio.wav';
    audio.load();
    audio.play();
  }

  saveWorkingSession() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    let ws = {
      id: <string>uuidv4(),
      date: dateTime,
      projectId: this.selectedProjectId,
      delay: this.count
    };
    this.workingSessions.push(ws);
    this.user.workingSessions = this.workingSessions;
    this.projects.find((x) => x.uid == this.selectedProjectId).TimePassed += this.count;
    this.user.projects = this.projects;
    this.userService.changeUserData(this.user);
  }

}


