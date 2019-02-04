import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { GlobalSharingVariableService } from '../global-service/global-sharing-variable.service';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

  /**
   *
   * Component used to confirm action done by the user / just change the variable via changeInfoSnackBar(infoSnackBar: string)
   * in GlobalSharingVariableService, it will automaticaly print the confirmation on the screen
   *
   */
@Component({
  selector: 'app-info',
  templateUrl: './inf.component.html'
})
export class InfoComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private globalSharingVariableService: GlobalSharingVariableService) { }

  ngOnInit() {
    this.globalSharingVariableService.infoSnackBarSubject.subscribe(
      (info) => {
        this.snackBar.openFromComponent(SnackInfoComponent, {
          duration: 2000,
          data: info
        });
      });
  }

}


@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnackInfoComponent implements OnInit {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
   }

  ngOnInit() {

  }

}
