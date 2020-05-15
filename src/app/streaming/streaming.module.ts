import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingDetailComponent } from './components/streaming-detail/streaming-detail.component';
import { StreamingListComponent } from './components/streaming-list/streaming-list.component';


@NgModule({
  declarations: [StreamingDetailComponent, StreamingListComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule
  ]
})
export class StreamingModule { }
