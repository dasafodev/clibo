import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Auction } from '../shared/models/auction';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuctionService } from '../shared/services/auction.service';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-meet',
  templateUrl: './jitsi-meet.component.html',
  styleUrls: ['./jitsi-meet.component.css'],
})
export class JitsiMeetComponent implements OnInit, AfterViewInit {
  title = 'app';
  domain: string = 'meet.jit.si';
  options: any;
  api: any;
  auction: Auction;
  auctionId: string;
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private auctionService: AuctionService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.auctionId = params.id;
      this.auctionService.getAuction(this.auctionId).subscribe((auction: Auction) => {
        this.auction = auction;
        const user = JSON.parse(localStorage.getItem('user'));
        if (
          this.auction.id_user !== user.uid &&
          this.auction.winner !== user.uid
        ) {
          this.toastService.error('No tiene permisos para acceder a esta sesión');
          this.router.navigate(['/home']);
        }
      });
    });
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: `Conference${this.auctionId}`,
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet'),
    };
    console.log(this.options.roomName);

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }
}
