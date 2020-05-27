import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Comments } from 'src/app/shared/models/comments';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogData {
  price: number;
  message: string;
}


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
    private toastService: ToastrService,
    private mainRouter: Router,
    public dialog: MatDialog
  ) {
    this.buildForm();
  }

  donatePrice:number;
  message:string;

  // STREAMING VARS
  streamingId: string;
  title = 'app';
  domain: string = 'meet.jit.si';
  options: any;
  api: any;
  streamingInfo: any;
  comments: Comments[];
  innerHeight;
  participants: number = 0;
  user: any;
  suggestedVideos: any[];
  comment: FormGroup;
  updateUsers: Observable<number>;
   

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.user = JSON.parse(localStorage.getItem('user'));
    if( ! this.user ){
      this.mainRouter.navigate(['home/']);
    }
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
          console.log(result);
          this.streamingInfo = result[0];
          if(this.streamingInfo.status === false) {
            this.mainRouter.navigate(['home/']);
          }
        });
    });
    this.streamingService.getSuggestedStreamings(this.user.preferences).subscribe(streamings => {
      this.suggestedVideos = streamings;
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
    this.updateUsers = new Observable(observer => {
      observer.next(this.api.getNumberOfParticipants());
      observer.complete();
    })
    }
    ngAfterViewChecked(){
      this.updateUsers.subscribe((parti:number) => {
        this.participants = parti;
      });
    }
    redirect(id:string){
      this.mainRouter.navigate(['/streaming'], { queryParams: {id}});
    }

    private buildForm(){
      this.comment = this.formBuilder.group({
        comment:['',[Validators.required]],
      })
    }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDonate, {
      width: '250px',
      data: {message: this.message, price: this.donatePrice}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.donatePrice = parseInt(result);
      this.streamingService.increaseDonations(this.streamingId,this.donatePrice);
    });
  }
}

  @Component({
    selector: 'dialog-donate',
    templateUrl: 'dialog-donate.html',
  })
  export class DialogDonate {
  
    constructor(
      public dialogRef: MatDialogRef<DialogDonate>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }