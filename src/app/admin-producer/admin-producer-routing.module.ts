import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { StreamingsListComponent } from './components/streamings-list/streamings-list.component';
import { AddStreamingComponent } from './components/add-streaming/add-streaming.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { ProposalListComponent } from './components/proposal-list/proposal-list.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';


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
        path:'add-auction',
        component: AddAuctionComponent
      },
      {
        path:'add-proposal/:id',
        component: AddProposalComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'auctions',
        component: AuctionListComponent
      },
      {
        path:'proposals',
        component: ProposalListComponent
      },
      {
        path: 'videos',
        component: VideoDetailComponent
      },
      {
        path: 'auction/:id',
        component: AuctionDetailComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProducerRoutingModule { }
