import { Component, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-sign-up',
    templateUrl: 'dialog-sign-up.html',
    styleUrls: ['./dialog-sign-up.css']

  })
  export class DialogSignUp {
  
    signUp: Boolean = true;

    constructor(
      public dialogRef: MatDialogRef<DialogSignUp>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    changeBool(){
      (this.signUp)?this.signUp=false:this.signUp=true;
    }
  
  }