import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StreamingService } from 'src/app/shared/services/streaming.service';

@Component({
  selector: 'app-add-streaming',
  templateUrl: './add-streaming.component.html',
  styleUrls: ['./add-streaming.component.css']
})
export class AddStreamingComponent implements OnInit {

  form : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private streamingService: StreamingService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
      this.form = this.formBuilder.group({
        name:['',[Validators.required]],
        photoURL:['',[Validators.required]],
        url:['',[Validators.required]],
        short_description:['',[Validators.required]],
        long_description:['',[Validators.required]],
      })
  }

  postStreaming(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const streaming = {
        id_producer:JSON.parse( localStorage.getItem('user')).uid,
        name:this.form.value.name,
        url:this.form.value.url,
        photoURL:this.form.value.photoURL,
        short_description:this.form.value.short_description,
        long_description:this.form.value.long_description
      }
      this.streamingService.postStreaming(streaming);
    }

  }
}
