import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Proposal } from '../models/proposal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) { }

  public createProposal(proposal: Proposal) {
    return this.afs
      .collection("proposals")
      .add(proposal)
      .then(resp => {
        this.afs
          .collection("proposals")
          .doc(resp.id)
          .update({
            uid: resp.id
          });
          this.ngZone.run(() => {
            this.router.navigate(['producer/proposals']);
          });
      })
      .catch(err => console.error(err));
}

}
