import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { User } from 'firebase';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  constructor(
    private auctionService: AuctionService
  ) { }

  auctions: any;
  logged_user_auctions: any;
  user: User;

  ngOnInit(): void {
    this.getUserAuctions();
    this.auctionService.getAuctions()
      .subscribe(resp => {
        this.auctions = resp;
        for (let i = 0; i < this.auctions.length; i++) {
          const auction = this.auctions[i];
          this.getCreatorName(auction.id_user, auction);
        }
      })

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUserAuctions() {
    var username = JSON.parse(localStorage.getItem('user')).uid;
    this.auctionService.getUserAuctions(username)
      .subscribe(resp => {
        this.logged_user_auctions = resp;
      })
  }

  getCreatorName(id_user: string, auction: any) {
    this.auctionService.getAuctionCreator(id_user)
      .subscribe(resp => {
        auction.username = JSON.parse(JSON.stringify(resp)).displayName;
        auction.image = JSON.parse(JSON.stringify(resp)).photoURL;
      });
  }

}
