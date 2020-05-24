import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ProposalService } from 'src/app/shared/services/proposal.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {

  constructor(
    private proposalService: ProposalService
  ) { }

  proposals:any;
  logged_user_proposals:any;
  user:User;

  ngOnInit(): void {
    this.getUserProposals();
    this.proposalService.getProposals()
      .subscribe(resp => {
        this.proposals = resp;
        for (let i = 0; i < this.proposals.length; i++) {
          const auction = this.proposals[i];
          this.getCreatorName(auction.id_user, auction);
        }
      })
    
      this.user = JSON.parse( localStorage.getItem('user'));
  }

  getUserProposals(){
    var username = JSON.parse( localStorage.getItem('user')).uid;
    this.proposalService.getUserAuctions(username)
    .subscribe(resp => {
      this.logged_user_proposals = resp;
    })
  }

  getCreatorName(id_user:string, proposal:any){
    this.proposalService.getProposalCreator(id_user)
    .subscribe(resp => {
      proposal.username = JSON.parse(JSON.stringify(resp)).displayName;
      proposal.image = JSON.parse(JSON.stringify(resp)).photoURL;
    });
  }

}
