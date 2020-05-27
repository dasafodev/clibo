import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Auction } from '../models/auction';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router
  ) { }

  getAuction(id: string) {
    return this.afs.collection('auctions').doc(id).valueChanges();
  }

  public getAuctions() {
    return this.afs.collection('auctions').valueChanges();
  }

  public getAuctionsWithoutLoggedLess(){
    var user = JSON.parse(localStorage.getItem('user'))
    return this.afs.collection('auctions', query => query.where('id_user', '<', user)).valueChanges();
  }

  public getAuctionsWithoutLoggedMore(){
    var user = JSON.parse(localStorage.getItem('user'))
    return this.afs.collection('auctions', query => query.where('id_user', '>', user)).valueChanges();
  }

  public getAuctionCreator(id_user: string) {
    return this.afs.collection('user').doc(id_user).valueChanges();
  }

  public getAuctionProposals(id_auction: string) {
    return this.afs.collection('proposals', query => query.where('id_auction', '==', id_auction)).valueChanges();
  }

  getUserAuctions(user_id) {
    return this.afs.collection('auctions', query => query.where('id_user', '==', user_id)).valueChanges();
  }

  selectWinner(id_auction: string, id_proposal: string, id_winner:string) {
    var docRef = this.afs.collection("auctions").doc(id_auction);
    docRef.update({
      winner: id_winner
    })
    var docRef = this.afs.collection("proposals").doc(id_proposal);
    docRef.update({
      winner: true
    })
    this.ngZone.run(() => {
      this.router.navigate(['producer/auctions']);
    });
  }

  public createAuction(auction: Auction) {
    return this.afs
      .collection("auctions")
      .add(auction)
      .then(resp => {
        this.afs
          .collection("auctions")
          .doc(resp.id)
          .update({
            uid: resp.id
          });
        this.ngZone.run(() => {
          this.router.navigate(['producer/auctions']);
        });
      })
      .catch(err => console.error(err));
  }


}
