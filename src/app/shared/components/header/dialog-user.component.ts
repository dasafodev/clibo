import { Component, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dialog-user',
    templateUrl: 'dialog-user.html',
  })
  export class DialogUser {
  
    
    constructor(
      public dialogRef: MatDialogRef<DialogUser>,
      @Inject(MAT_DIALOG_DATA) public data) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }