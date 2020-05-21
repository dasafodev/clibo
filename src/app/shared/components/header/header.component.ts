import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUser } from './dialog-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUser, {
      width: 'auto',
      height:'auto'
    //  data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  verifyUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    return (user)? true:false ;
  }
  

}

