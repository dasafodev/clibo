import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  options = [
    { value: 'producer', viewValue: 'Producer' },
    { value: 'viewer', viewValue: 'Viewer' }
  ]
  dataUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
  }

  signUp(event: Event) {
    event.preventDefault();
    this.auth.signUp(
      this.dataUser.value.email, 
      this.dataUser.value.password, 
      this.dataUser.value.role)
  }

  private buildForm() {
    this.dataUser = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

}
