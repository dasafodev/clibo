import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  breakpoint: number;
  constructor() { }

  name:string;
  email:string;
  photo:string;

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.name = JSON.parse( localStorage.getItem('user')).displayName;
    this.email = JSON.parse( localStorage.getItem('user')).email;
    this.photo = JSON.parse( localStorage.getItem('user')).photoURL;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }

}
