import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamingListComponent } from './components/streaming-list/streaming-list.component';
import { StreamingDetailComponent } from './components/streaming-detail/streaming-detail.component';


const routes: Routes = [
  {
    path:'list',
    component: StreamingListComponent
  },
  {
    path:'detail/:id',
    component: StreamingDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingRoutingModule { }
