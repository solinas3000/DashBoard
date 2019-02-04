import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'doubleClickDialog',
  templateUrl: 'double-click-dialog.component.html',
})
export class DoubleClickDialogComponent {
    text: string;
    type: string;
  constructor(
    public dialogRef: MatDialogRef<DoubleClickDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.text = data.text;
      this.type = data.type;
    }

  onNoClick(): void {
    this.dialogRef.close('');
  }
  onYesClick(): void {
    const data = {
      text: this.text,
      type: this.type
    };
    console.log(data);
    this.dialogRef.close(data);
  }

}

