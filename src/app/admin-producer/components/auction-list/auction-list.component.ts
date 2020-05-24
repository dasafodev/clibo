import { Component, OnInit } from '@angular/core';
import { AddProposalComponent } from '../add-proposal/add-proposal.component';
import { AuctionService } from 'src/app/shared/services/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  constructor(
    private auctionService: AuctionService
  ) { }

  auctions:any;
  user:any;

  ngOnInit(): void {
    this.auctionService.getAuctions()
      .subscribe(resp => {
        this.auctions = resp;
        for (let i = 0; i < this.auctions.length; i++) {
          const auction = this.auctions[i];
          this.getCreatorName(auction.id_user, auction);
        }
      })
  }

  getCreatorName(id_user:string, auction:any){
    this.auctionService.getAuctionCreator(id_user)
    .subscribe(resp => {
      auction.username = JSON.parse(JSON.stringify(resp)).displayName;
    });
  }


}
