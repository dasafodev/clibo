import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { StreamingService } from 'src/app/shared/services/streaming.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private streamingService: StreamingService) { }

  streamingId:string;
  streaming: any;
  likes: number;
  dislikes: number;
  undefine: number;
  comments : any;

  
  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map(()=> window.history.state)).subscribe(stream => {
      this.streaming = stream;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.streamingId = params.id;
      this.streamingService.getStreamingComments(this.streamingId).subscribe(comments => {
        this.comments = comments;
        if(comments.length > 0)
        {
          this.streamingService.getCommentsAnalysis(comments).subscribe((result:any) => {
            this.likes = (result.like / comments.length) * 100;
            this.dislikes = (result.dislike / comments.length) * 100;
            this.undefine = (result.thoughtful / comments.length) * 100;
          });
        }
      });
    });
  }
}
