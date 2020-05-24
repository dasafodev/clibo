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

  public getAuctions() {
    return this.afs.collection('auctions').valueChanges();
  }

  public getAuctionCreator(id_user: string) {
    return this.afs.collection('user').doc(id_user).valueChanges();
  }

  getUserAuctions(user_id){
    return this.afs.collection('auctions', query => query.where('id_user', '==', user_id)).valueChanges();
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
