import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogin } from './dialog-login.component';
import { DialogSignUp } from './dialog-sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }
  user;

  openDialogLogIn(): void {
    const dialogRef = this.dialog.open(DialogLogin,{
      height:'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(DialogSignUp);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  verifyUser(){
    this.user = JSON.parse(localStorage.getItem('user'));
    return (this.user)? true:false ;
  }
  

}

