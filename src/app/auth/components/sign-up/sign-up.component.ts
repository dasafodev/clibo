import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, DoCheck {

  @Output()
  cerrarVentana = new EventEmitter<string>();

  @Output()
  changeView = new EventEmitter<Boolean>();

  // @ViewChild('imageUser') inputImageUser: ElementRef;


  isLinear:boolean=true;
  dataUser: FormGroup;
  upLoadPercent: Observable<number>;
  urlImage: string;
  isValid:boolean=false;
  imageValid:boolean=false;


  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private toastService: ToastrService

  ) {
    this.buildForm();
  }


  ngOnInit(): void {
  }

  ngDoCheck(){
    if(!this.dataUser.valid){
      this.isValid=false;
    }else{
      this.isValid=true;
    }
  }

  signUp(event: Event) {
    event.preventDefault();
    let user: User = {
      uid: '',
      email: this.dataUser.value.email,
      displayName: this.dataUser.value.name,
      photoURL: this.urlImage,
      emailVerified: false,
      favorite_streamings: [],
    }
    console.log('preferences', this.dataUser.value.preferences)
    this.auth.signUp(user, this.dataUser.value.password)
      .then((res) => {
        user.uid=res.user.uid;
        this.auth.updateProfile(res.user);
        console.log('res', user);
        this.auth.uploadData(user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log( res.user.uid,  this.dataUser.value.preferences)
        this.auth.addPreferencesToUser(res.user.uid, this.dataUser.value.preferences)
          .subscribe((resp) => {
            console.log('resp', resp)
          });
        this.toastService.success("Tu registro ha sido correcto")
        this.cerrarVentana.emit("cerrar");
      })
      .catch(err => {
        this.toastService.error("Registro incorrecto")
        console.error(err)
      })
  }

  changeBool() {
    this.changeView.emit(true);
  }

  onUpload(e) {
    this.imageValid=false;
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePhat = `profile/${id}`;
    const ref = this.storage.ref(filePhat);
    const task = this.storage.upload(filePhat, file);
    this.upLoadPercent = task.percentageChanges();
    task.then(()=> {
      ref.getDownloadURL()
      .subscribe( urlResp=> {
        this.urlImage=urlResp;
        this.auth.verifyImage(this.urlImage)
        .subscribe(resp => {
          if(resp===1){
            this.toastService.error("Imagen invalida")
            this.imageValid=false;
            ref.delete();
          }
          if(resp===0){
            this.imageValid=true;
          }
          
        })
      });
    })
  }

  private buildForm() {
    this.dataUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      preferences: ['', [Validators.required]],
    })
  }

}
