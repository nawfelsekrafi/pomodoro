import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() msg: string = "Are you sure to delete your account!";
  @Input() buttonValue: string = "Delete";
  @Output() action: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() buttonValueEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() display: string ;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges () : void {
    document.getElementById('myModal').style.setProperty('display', this.display);      
  }


  sendEvent() {
    this.action.emit(true);
    this.close();
    
  }

  // When the user clicks Cancel, close the modal
  close() {
    this.display = "none"
    this.buttonValueEvent.emit(this.display);
    document.getElementById('myModal').style.setProperty('display', this.display);      
      
  }

  // When the user clicks the button, open the modal
  openPopupDialog() {
    document.getElementById('myModal').style.setProperty('display', 'block');
  }  

}
