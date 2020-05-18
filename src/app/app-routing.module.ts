import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { JitsiMeetComponent } from './jitsi-meet/jitsi-meet.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      
      {
        path: 'streaming',
        loadChildren: () => import('./streaming/streaming.module').then(m => m.StreamingModule)
      },
    ]
  },
  {
    path: 'producer',
    loadChildren: () => import('./admin-producer/admin-producer.module').then(m => m.AdminProducerModule)
  },
  {
    path:'meet',
    component:JitsiMeetComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
