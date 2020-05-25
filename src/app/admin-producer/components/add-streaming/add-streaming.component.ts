import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StreamingService } from 'src/app/shared/services/streaming.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Streaming, StreamingCategory } from 'src/app/shared/models/streaming';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-streaming',
  templateUrl: './add-streaming.component.html',
  styleUrls: ['./add-streaming.component.css']
})
export class AddStreamingComponent implements OnInit, DoCheck {

  @ViewChild('cover') cover: ElementRef;

  upLoadPercent: number;
  urlImage: string;
  form: FormGroup;
  categoriesOptions;
  category: string;
  imageValid: boolean = false;
  isValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private streamingService: StreamingService,
    private storage: AngularFireStorage,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngDoCheck() {
    if (!this.form.valid) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      short_description: ['', [Validators.required]],
      long_description: ['', [Validators.required]]
      // category: ['', [Validators.required]]
    })
    this.categoriesOptions = [
      {
        value: StreamingCategory.COCINA
      },
      {
        value: StreamingCategory.CLASES
      },
      {
        value: StreamingCategory.ENTRENAMIENTO
      },
      {
        value: StreamingCategory.ENTRETENIMIENTO
      },
      {
        value: StreamingCategory.LECTURA
      },
    ]
  }

  postStreaming(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const streaming: Streaming = {
        uid: '',
        id_producer: JSON.parse(localStorage.getItem('user')).uid,
        photo_producer: JSON.parse(localStorage.getItem('user')).photoURL,
        name: this.form.value.name,
        coverURL: this.urlImage,
        short_description: this.form.value.short_description,
        long_description: this.form.value.long_description,
        likes: 0,
        status: true,
        category: this.category
      }
      console.log('streaming', streaming)
      this.streamingService.postStreaming(streaming)
        .then((resp) => {
          console.log('resp', resp);
          this.streamingService.updateIdStreaming(resp);
          this.toastService.success("Se ha creado correctamente tu Streaming")
        })
        .catch((err) => {
          console.error(err)
          this.toastService.error("Tuvimos problemas al crear tu Streaming")
        });
    }
  }

  onUpload(e) {
    this.imageValid = false;
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePhat = `cover_streamings/${id}`;
    const ref = this.storage.ref(filePhat);
    const task = this.storage.upload(filePhat, file);
    task.percentageChanges().subscribe(resp => this.upLoadPercent = resp);
    task.then(() => {
      ref.getDownloadURL()
        .subscribe(urlResp => {
          this.urlImage = urlResp;
          this.streamingService.verifyImage(this.urlImage)
            .subscribe(resp => {
              if (resp === 1) {
                this.toastService.error("Imagen invalida")
                this.imageValid = false;
                ref.delete();
              }
              if (resp === 0) {
                this.streamingService.imageClassifier(this.urlImage).subscribe(categoryResp => {
                  this.category = JSON.parse(JSON.stringify(categoryResp)).value;
                  this.imageValid = true;
                });
              }
            })
        });
    })
  }
}
