import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { DialogLogin } from './components/header/dialog-login.component';
import { RouterModule } from '@angular/router';
import { DialogSignUp } from './components/header/dialog-sign-up.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, DialogLogin, DialogSignUp],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    RouterModule
  ],
  exports: [ HeaderComponent, FooterComponent, DialogLogin,DialogSignUp]
})
export class SharedModule { }
