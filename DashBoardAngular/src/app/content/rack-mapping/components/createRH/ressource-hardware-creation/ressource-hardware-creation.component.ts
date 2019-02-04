import { Component, Input, Inject, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { RessourceHardwareDetail } from '../../../models/ressourceHardwareDetail.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DoubleClickDialogComponent } from '../../double-click-dialog/double-click-dialog.component';
import { RessourceCategory } from '../../../models/ressourceCategory.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-ressource-hardware-creation',
  templateUrl: './ressource-hardware-creation.component.html',
  styleUrls: ['./ressource-hardware-creation.component.css']
})
export class RessourceHardwareCreationComponent {

  regex: RegExp
  ID_RessourceHardware: Number = 0;
  activeBarCode: boolean = false;
  activeRest: boolean= false;
  ressourceHardwareDetail: RessourceHardwareDetail;
  categoryList: RessourceCategory[];
  messageValidationBarCode: string = ''
  @Input()
  set RessourceHardware(ID_RessourceHardware: Number) {
    this.ID_RessourceHardware = ID_RessourceHardware;
  }

  get RessourceHardware(): Number { return this.RessourceHardware; }

  constructor(private ressourceHardwareService: RessourceHardwareService,
      public sharingVariableService: SharingVariableService) {
    this.ressourceHardwareDetail = new RessourceHardwareDetail();
    this.sharingVariableService.ressourceCategorySubject.subscribe((list) => {
      this.categoryList = list;
    });
  }

  catSelected(event) {
    console.log(event);
    this.activeBarCode = true;
    if(event.value.Category === 'RACK'){
      this.regex = this.sharingVariableService.regex
      this.messageValidationBarCode="BarCode is not valid ex: name-05"
    }else{
      this.regex = /^(\S*[ ]*\S*)*$/
      this.messageValidationBarCode="BarCode is not valid ex: name"
    }
    this.ressourceHardwareDetail.Category = event.value.Category;
  }

  // dblClick popup

  dblClickDialog(event) {
    console.log(event);
    const dialogRef = this.sharingVariableService.getDialog().open(DoubleClickDialogComponent, {
      width: '250px',
      data: { text: event.srcElement.value,
              type: event.srcElement.name}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.text !== '') {
        this.ressourceHardwareDetail[data.type] = data.text;
        console.log('The saveDialog was closed with saving');
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  // call popup

  openDialog(): void {
    console.log('inside openDialog');
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.ressourceHardwareDetail,
        type: 'hardware ressource',
        info: this.ressourceHardwareDetail.BarCode,
        action: 'add'
       }
    });

    dialogRef.afterClosed().subscribe(ressourceHardwareDetail => {
      if (ressourceHardwareDetail !== undefined) {
        this.ressourceHardwareService.createRessourceHardware(ressourceHardwareDetail)
          .subscribe(RessourceHardware => {
            console.log(RessourceHardware);
            this.sharingVariableService.changeInfoSnackBar(RessourceHardware.BarCode + ' saved correctly !');
            console.log('The saveDialog was closed with saving');
          }
        );
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

}


