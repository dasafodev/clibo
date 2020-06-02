import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  constructor(
    private auctionService: AuctionService,
    private router: Router,
  ) { }

  auctions: any;
  filterAuctions = new Array();
  logged_user_auctions: any;
  user: User;
  selected = new FormControl(0);

  ngOnInit(): void {
    this.getUserAuctions();
    this.auctionService.getAuctions()
      .subscribe(resp => {
        this.auctions = resp;
        var username = JSON.parse(localStorage.getItem('user')).uid;
        for (let i = 0; i < this.auctions.length; i++) {
          const auction = this.auctions[i];
          var auc_user = JSON.parse(JSON.stringify(auction)).id_user;
          this.getCreatorName(auction.id_user, auction);
          if(auc_user != username && !auction.winner){
            this.filterAuctions.push(auction);
          }
        }
      })

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  redirect(id:string){
    this.router.navigate(['/privateSession'], { queryParams: {id}});
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
