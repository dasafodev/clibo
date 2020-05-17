import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingDetailComponent } from './components/streaming-detail/streaming-detail.component';
import { StreamingListComponent } from './components/streaming-list/streaming-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [StreamingDetailComponent, StreamingListComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    MaterialModule,
  ]
})
export class StreamingModule { }
