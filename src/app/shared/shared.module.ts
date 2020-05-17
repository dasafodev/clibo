import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { DialogUser } from './components/header/dialog-user.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, DialogUser],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule
  ],
  exports: [ HeaderComponent, FooterComponent, DialogUser]
})
export class SharedModule { }
