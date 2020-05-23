import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-meet',
  templateUrl: './jitsi-meet.component.html',
  styleUrls: ['./jitsi-meet.component.css']
})
export class JitsiMeetComponent implements OnInit, AfterViewInit {

  title = 'app';
  domain: string = "meet.jit.si";
  options: any;
  api: any;
  @Input() userRoomName : string;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: `Conference${this.userRoomName}`,
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    }
    console.log(this.options.roomName);

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

}
