import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuctionService } from 'src/app/shared/services/auction.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {

  auctionId: string;
  proposals: any;
  userId: string;
  auction_user: User;
  category: string;
  auc_description:string;
  auc_price:number;
  private _destroyed$ = new Subject<any>();

  constructor(
    public router: ActivatedRoute,
    private auctionService: AuctionService,
    private authService: AuthService
  ) {
    
  }
  
  ngOnInit(): void {
    try{
    this.router.params
      .pipe(
        takeUntil(this._destroyed$),
        pluck('id')
      ).subscribe(id => {
        this.auctionId = id;
        this.auctionService.getAuction(id)
        .subscribe(resp => {
          this.userId = JSON.parse(JSON.stringify(resp)).id_user;
          this.category = JSON.parse(JSON.stringify(resp)).category;
          this.auc_description = JSON.parse(JSON.stringify(resp)).description;
          this.auc_price = JSON.parse(JSON.stringify(resp)).price;
          this.authService.getUser(this.userId)
          .subscribe(uResp => {
            this.auction_user = JSON.parse(JSON.stringify(uResp));
          })
        });
        this.auctionService.getAuctionProposals(id)
          .subscribe(resp => {
            this.proposals = resp;
            for (let i = 0; i < this.proposals.length; i++) {
              const proposal = this.proposals[i];
              this.authService.getUser(proposal.id_user)
              .subscribe(res =>{
                proposal.username = JSON.parse(JSON.stringify(res)).displayName;
                proposal.image = JSON.parse(JSON.stringify(res)).photoURL;
              })
            }
          });
      });
      }
      catch(e){}

  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
