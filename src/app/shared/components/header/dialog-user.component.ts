import { Component, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-user',
    templateUrl: 'dialog-user.html',
    styleUrls: ['./dialog-user.component.css']

  })
  export class DialogUser {
  
    signUp: Boolean = true;

    constructor(
      public dialogRef: MatDialogRef<DialogUser>,
      @Inject(MAT_DIALOG_DATA) public data) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    changeBool(){
      (this.signUp)?this.signUp=false:this.signUp=true;
    }
  
  }