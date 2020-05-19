import { Component, OnInit } from '@angular/core';
import { StreamingService } from 'src/app/shared/services/streaming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private streamingService: StreamingService

  ) { }
  videos: any;
  ngOnInit(): void {
    this.streamingService.getAllStreamings()
      .subscribe(resp_vids => {
        this.videos = resp_vids.sort(function() {return Math.random() - 0.5});; //desordena la lista
        console.log('resp:', this.videos)
      })
  }

}
