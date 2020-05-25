import { Component, OnInit } from '@angular/core';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streamings-list',
  templateUrl: './streamings-list.component.html',
  styleUrls: ['./streamings-list.component.css']
})
export class StreamingsListComponent implements OnInit {

  constructor(
    private streamingService: StreamingService,
    private router: Router

  ) { }

  streamings: any;


  ngOnInit(): void {

    this.streamingService.getStreamings(JSON.parse(localStorage.getItem('user')).uid)
      .subscribe(resp => {
        this.streamings = resp;
      })

  }
  fillDatabase() {
    this.streamingService.fillDatabase();
  }

  deleteStreaming(id_streaming:string){
    console.log('id_streaming', id_streaming)
    this.streamingService.deleteStreaming(id_streaming);
  }

  redirect(stream) {
    this.router.navigate(['/producer/videos'], { queryParams: {id : stream.uid} , state: stream});
  }


}
