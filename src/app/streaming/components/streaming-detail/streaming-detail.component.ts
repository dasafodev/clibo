import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Comments } from 'src/app/shared/models/comments';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-streaming-detail',
  templateUrl: './streaming-detail.component.html',
  styleUrls: ['./streaming-detail.component.css'],
})
export class StreamingDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private streamingService: StreamingService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) {
    this.buildForm();
  }

  // STREAMING VARS
  streamingId: string;
  title = 'app';
  domain: string = 'meet.jit.si';
  options: any;
  api: any;
  streamingInfo: any;
  comments: Comments[];
  innerHeight;
  participants: number;
  user: any;
  comment: FormGroup;
  

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.router.queryParams.subscribe((params) => {
      this.streamingId = params.id;
      this.streamingService
        .getStreamingComments(this.streamingId)
        .subscribe((results: Comments[]) => {
          this.comments = results;
        });
      this.streamingService
        .getStreamingInfo(this.streamingId)
        .subscribe((result) => {
          this.streamingInfo = result[0];
        });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight;
  }
  async createComment(event){
    event.preventDefault();
    const comment : Comments = { streaming_id: this.streamingId, user_id: this.user.uid, user_name: this.user.displayName, text: this.comment.value.comment};
    this.streamingService.postComment(comment).then(response => this.comment.reset()).catch(err => this.toastService.error(err));
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: `Conference${this.streamingId}`,
      width: '100%',
      height: this.innerHeight * 0.7,
      parentNode: document.querySelector('#meet'),
    };
    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.executeCommand(
      'displayName',
      this.user.displayName
    );
    }

    private buildForm(){
      this.comment = this.formBuilder.group({
        comment:['',[Validators.required]],
      })
    }
  }

