import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { response } from 'express';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private streamingService: StreamingService, private router: Router) { }

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
  redirect(){
    this.router.navigate(['/streaming'], {queryParams : {id : this.streamingId}});
  }
  finish(){
    this.streamingService.finishStreaming(this.streamingId).then(response =>
      this.streaming.status = false
    )};
}
