import { Component, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-login',
    templateUrl: 'dialog-login.html',
    styleUrls: ['./dialog-login.css']

  })
  export class DialogLogin {
  
    signUp: Boolean = true;

    constructor(
      public dialogRef: MatDialogRef<DialogLogin>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    changeBool(){
      (this.signUp)?this.signUp=false:this.signUp=true;
    }
  
  }