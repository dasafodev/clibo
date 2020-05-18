import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private toastService: ToastrService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }


  signIn(event:Event){
    event.preventDefault();
    this.auth.signIn(this.dataUser.value.email,this.dataUser.value.password)
    this.cerrarVentana.emit("cerrar");
    this.toastService.success(`Bienvenido ${JSON.parse( localStorage.getItem('user')).displayName}`);
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
