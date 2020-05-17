import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  dataUser:FormGroup;

  @Output()
  cerrarVentana = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }


  signIn(event:Event){
    event.preventDefault();
    this.auth.signIn(this.dataUser.value.email,this.dataUser.value.password)
    this.cerrarVentana.emit("cerrar");
    console.log('form :', this.dataUser.value.email)
  }


  private buildForm(){
    this.dataUser = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
}
