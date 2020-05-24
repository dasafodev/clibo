import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Proposal } from '../models/proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(
    public afs: AngularFirestore
  ) { }

  public createAuction(proposal: Proposal) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection("proposals")
        .add(proposal)
        .then(resp => {
          this.afs
            .collection("proposals")
            .doc(resp.id)
            .update({
              uid: resp.id
            })
        }, err => reject(err));
    });
  }

}
