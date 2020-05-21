import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Streaming } from 'src/app/shared/models/streaming';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-streaming',
  templateUrl: './add-streaming.component.html',
  styleUrls: ['./add-streaming.component.css']
})
export class AddStreamingComponent implements OnInit {

  @ViewChild('cover') cover:ElementRef;

  upLoadPercent:Observable<number>;
  urlImage:Observable<string>;
  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private streamingService: StreamingService,
    private storage: AngularFireStorage,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
      this.form = this.formBuilder.group({
        name:['',[Validators.required]],
        url:['',[Validators.required]],
        short_description:['',[Validators.required]],
        long_description:['',[Validators.required]],
      })
  }

  postStreaming(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const streaming :Streaming = {
        uid:'',
        id_producer:JSON.parse( localStorage.getItem('user')).uid,
        photo_producer:JSON.parse( localStorage.getItem('user')).photoURL,
        name:this.form.value.name,
        urlStreaming:this.form.value.url,
        coverURL:this.cover.nativeElement.value , 
        short_description:this.form.value.short_description,
        long_description:this.form.value.long_description
      }
      this.streamingService.postStreaming(streaming)
      .then(()=> this.toastService.success("Se ha creado correctamente tu Streaming"))
      .catch(() => this.toastService.error("Tuvimos problemas al crear tu Striming"));
    }
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePhat = `cover_streamings/${id}`;
    const ref = this.storage.ref(filePhat);
    const task = this.storage.upload(filePhat,file);
    this.upLoadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL()))
    .subscribe();
  }
}
