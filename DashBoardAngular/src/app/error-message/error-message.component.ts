import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GlobalSharingVariableService } from '../global-service/global-sharing-variable.service';
  /**
   *
   * Service used to show error message coming from the back end / all errors are catched in requestInterceptorService and automaticaly send here
   *
   *
   */
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent implements OnInit {
  constructor(
    private globalSharingVariableService: GlobalSharingVariableService,
    private dialog: MatDialog,
  ) {}

  getDialog(){
    this.dialog.closeAll()
    return this.dialog
  }

  ngOnInit() {
    this.globalSharingVariableService.getErrorAsOb().subscribe(error => {
      console.log('IN NGONINIT ERROR')
      this.openDialogError(error);
    });
  }

    openDialogError(error): void {
    const dialogRef = this.getDialog().open(ErrorDialog, {
      width: '250px',
      data: error
    });

    dialogRef.afterClosed().subscribe(data => {
    });
  }

}


@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialog {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

}



