import { Component, OnInit } from '@angular/core';


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

  constructor() {}

  ngOnInit(): void {
  }
  

  start(): void {
    this.isStart = true;
    var interval = setInterval(() => {
      if (this.time > 0) {
        this.now++;
        var timeleft: number = this.time - this.now;
        var min = Math.floor(timeleft / 60);
        this.minutes = min < 10 ? '0' + min : min.toString();
        var sec = Math.floor(timeleft - min * 60);
        this.seconds = sec < 10 ? '0' + sec : sec.toString();
        if (sec == 10 && min < 1) {
          this.playAudioFinishBreak();
        }
        if (
          (min == 0 && sec == 0) ||
          this.isPause ||
          this.isBreakTime ||
          this.isFocusTime
        ) {
          if (min == 0 && sec == 0) {
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
  }

  next() {
    this.time = this.count * 60;
    this.isFocusTime = false;
    this.isSetting = false;
    this.isStart = false;
    this.isBreakTime = false;
  }

  cancel() {
    this.time = 0;
    this.count = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.now = 0;
    this.isFocusTime = false;
    this.isBreakTime = true;
  }

  playAudioFinishBreak() {
    let audio = new Audio();
    audio.src = '../assets/finishBreakAudio.wav';
    audio.load();
    audio.play();
  }



}
