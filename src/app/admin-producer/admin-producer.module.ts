import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProducerRoutingModule } from './admin-producer-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    AdminProducerRoutingModule,
    MaterialModule
    
  ]
})
export class AdminProducerModule { }
