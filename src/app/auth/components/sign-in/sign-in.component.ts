import { Component, OnInit, EventEmitter, Output, NgZone } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { User } from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  dataUser:FormGroup;

  @Output()
  cerrarVentana = new EventEmitter<string>();

  @Output()
  changeView = new EventEmitter<Boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public ngZone: NgZone,
    public router: Router,
    private toast:ToastrService,


  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }


  async signIn(event:Event){
    let user:User;
    event.preventDefault();
    await this.auth.signIn(this.dataUser.value.email,this.dataUser.value.password)
    .then((resp) => {
      console.log( resp)
      user = resp.user;
      this.cerrarVentana.emit("cerrar");
    })
    .then(()=> {
      this.auth.updateLocalStorage2(user.uid).then(()=>{
        this.toast.success(JSON.parse( localStorage.getItem('user')).displayName)

      })

    });

  
  }

  changeBool(){
    this.changeView.emit(true);
  }


  private buildForm(){
    this.dataUser = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
}
