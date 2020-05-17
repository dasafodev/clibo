import { Component, OnInit } from '@angular/core';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Streaming } from 'src/app/shared/models/streaming';

@Component({
  selector: 'app-streamings-list',
  templateUrl: './streamings-list.component.html',
  styleUrls: ['./streamings-list.component.css']
})
export class StreamingsListComponent implements OnInit {

  constructor(
    private streamingService: StreamingService,
  ) { }

  streamings:any;

  ngOnInit(): void {

    this.streamingService.getStreamings(JSON.parse(localStorage.getItem('user')).uid)
      .subscribe(resp => {
        this.streamings= resp;
        console.log('resp:', resp)
      })
    
  }
  fillDatabase(){
    this.streamingService.fillDatabase();
  }

  

}
