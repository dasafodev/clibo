import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Auction } from '../models/auction';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public router: Router,
    public authService: AuthService
  ) { }

  user: any;

  public getAuctions() {
    return this.afs.collection('auctions').valueChanges();
  }

  public getAuctionCreator(id_user: string) {
    return this.afs.collection('user').doc(id_user).valueChanges();

    // .subscribe(resp => {
    //   console.log('User es ', resp);
    // var user_id = resp['id_user'];
    // this.authService.getUser(user_id)
    //   .subscribe(res => {
    //     this.user = res;
    // })
    // });

    // return this.user.displayName;
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
