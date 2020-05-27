import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ProposalService } from 'src/app/shared/services/proposal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {

  constructor(
    private proposalService: ProposalService,
    private authService: AuthService,
    private router: Router,
  ) { }

  proposals: any;
  logged_user_proposals: any;
  user: User;
  filterProposals = new Array();
  winnerProposals = new Array();

  ngOnInit(): void {
    this.getUserProposals();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUserProposals() {
    var username = JSON.parse(localStorage.getItem('user')).uid;
    this.proposalService.getUserAuctions(username)
      .subscribe(resp => {
        this.logged_user_proposals = resp;
        for (let i = 0; i < this.logged_user_proposals.length; i++) {
          const proposal = this.logged_user_proposals[i];
          this.getAuction(proposal.id_auction, proposal);
          var winner = JSON.parse(JSON.stringify(proposal)).winner;
          if(!winner){
            this.filterProposals.push(proposal);
          }
          else{
            this.winnerProposals.push(proposal);
          }
        }
      })
  }

  redirect(id:string){
    this.router.navigate(['/privateSession'], { queryParams: {id}});
  }

  getAuction(id_auction: string, proposal: any) {
    this.proposalService.getProposalAuction(id_auction)
      .subscribe(resp => {
        proposal.creator = JSON.parse(JSON.stringify(resp)).id_user;
        proposal.category = JSON.parse(JSON.stringify(resp)).category;
        proposal.original_price = JSON.parse(JSON.stringify(resp)).price;
        this.getCreatorName(proposal.creator, proposal);
      });
  }

  getCreatorName(id_user: string, proposal: any) {
    this.proposalService.getProposalCreator(id_user)
      .subscribe(resp => {
        proposal.username = JSON.parse(JSON.stringify(resp)).displayName;
        proposal.image = JSON.parse(JSON.stringify(resp)).photoURL;
      });
  }

}
