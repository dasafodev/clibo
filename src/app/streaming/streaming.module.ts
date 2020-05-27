import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingDetailComponent, DialogDonate } from './components/streaming-detail/streaming-detail.component';
import { StreamingListComponent } from './components/streaming-list/streaming-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StreamingDetailComponent, StreamingListComponent,DialogDonate],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [StreamingListComponent ]
})
export class StreamingModule { }
