import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProducerRoutingModule } from './admin-producer-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';
import { StreamingsListComponent } from './components/streamings-list/streamings-list.component';
import { AddStreamingComponent } from './components/add-streaming/add-streaming.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { ProposalListComponent } from './components/proposal-list/proposal-list.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { AddProposalComponent } from './components/add-proposal/add-proposal.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';



@NgModule({
  declarations: [
    NavComponent,
    StreamingsListComponent,
    AddStreamingComponent,
    ProfileComponent,
    AuctionListComponent,
    ProposalListComponent,
    AddAuctionComponent,
    AddProposalComponent,
    VideoDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminProducerRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    AddProposalComponent
  ]
})
export class AdminProducerModule { }
