import { Component, OnInit, AfterViewInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

    this.options = {
      roomName: "JitsiMeetAPIExample",
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

}
