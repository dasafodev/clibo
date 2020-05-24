import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Streaming } from 'src/app/shared/models/streaming';
import { Comments } from 'src/app/shared/models/comments';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-streaming-detail',
  templateUrl: './streaming-detail.component.html',
  styleUrls: ['./streaming-detail.component.css']
})
export class StreamingDetailComponent implements OnInit {

  constructor(private router: ActivatedRoute, private streamingService: StreamingService) { }

  // STREAMING VARS
  streamingId: string;
  title = 'app';
  domain: string = "meet.jit.si";
  options: any;
  api: any;
  comments : Comments[];

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.streamingId = params.id;
      this.streamingService.getStreamingComments(this.streamingId).subscribe((results: Comments[]) => {
        this.comments = results;
      })
    });
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: `Conference${this.streamingId}`,
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    }
    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

}