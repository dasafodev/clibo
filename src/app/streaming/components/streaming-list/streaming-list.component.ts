import { Component, OnInit } from '@angular/core';
import { StreamingService } from 'src/app/shared/services/streaming.service';

@Component({
  selector: 'app-streaming-list',
  templateUrl: './streaming-list.component.html',
  styleUrls: ['./streaming-list.component.css']
})
export class StreamingListComponent implements OnInit {

  constructor(
    private streamingService: StreamingService
  ) { }

  videos:any;

  ngOnInit(): void {
    this.streamingService.getAllStreamings()
    .subscribe(resp_vids => {
      this.videos = resp_vids;
      console.log('resp:', resp_vids)
    })
  }

}