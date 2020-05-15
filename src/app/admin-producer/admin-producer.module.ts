import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProducerRoutingModule } from './admin-producer-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';
import { StreamingsListComponent } from './components/streamings-list/streamings-list.component';
import { AddStreamingComponent } from './components/add-streaming/add-streaming.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavComponent, StreamingsListComponent, AddStreamingComponent],
  imports: [
    CommonModule,
    AdminProducerRoutingModule,
    MaterialModule,
    ReactiveFormsModule
    
  ]
})
export class AdminProducerModule { }
