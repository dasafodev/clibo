import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { StreamingsListComponent } from './components/streamings-list/streamings-list.component';
import { AddStreamingComponent } from './components/add-streaming/add-streaming.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path:'list',
        component: StreamingsListComponent
      },
      {
        path:'add-streaming',
        component: AddStreamingComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProducerRoutingModule { }
