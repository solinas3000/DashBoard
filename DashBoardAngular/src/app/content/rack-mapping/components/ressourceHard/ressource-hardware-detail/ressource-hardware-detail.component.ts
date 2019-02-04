import { Component, Input, Inject } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { RessourceHardwareDetail } from '../../../models/ressourceHardwareDetail.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { RessourceCategory } from '../../../models/ressourceCategory.model';
import { DoubleClickDialogComponent } from '../../double-click-dialog/double-click-dialog.component';
import { DialogComponent } from '../../dialog/dialog.component';

  /**
   *
   * Part One for the content of the selected hardware in the list / Show the detail of the ressource hardware
   *
   */
@Component({
  selector: 'app-ressource-hardware-detail',
  templateUrl: './ressource-hardware-detail.component.html',
  styleUrls: ['./ressource-hardware-detail.component.css']
})
export class RessourceHardwareDetailComponent {
  categoryList: RessourceCategory[];
  categorySelected: RessourceCategory;
  ID_RessourceHardware: Number = 0;
  ressourceHardwareDetail: RessourceHardwareDetail;

  @Input()
  set RessourceHardware(ID_RessourceHardware: Number) {
    this.ID_RessourceHardware = ID_RessourceHardware;
    this.getRessourceHardwareDetail(this.ID_RessourceHardware);
  }

  ngOnInit() {
    this.sharingVariableService.ressourceCategorySubject.subscribe(list => {
      this.categoryList = list;
    });
  }

  constructor(private ressourceHardwareService: RessourceHardwareService,
                    public sharingVariableService: SharingVariableService) {
    this.ressourceHardwareDetail = new RessourceHardwareDetail();
  }

  getRessourceHardwareDetail(ID_RessourceHardware): void {
    this.ressourceHardwareService.getRessourceHardwareDetail(ID_RessourceHardware)
        .subscribe(ServerData => {
            console.log(ServerData);
            this.ressourceHardwareDetail = ServerData._items[0];
            this.categorySelected = this.categoryList.find(x => x.Category === this.ressourceHardwareDetail.Category);
            console.log(this.categorySelected);
      });
  }

  catSelected(event) {
    console.log(event);
    this.ressourceHardwareDetail.Category = event.value.Category;
  }

  /**
   *
   * Call DoubleClickDialogComponent
   *
   */
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

  /**
   *
   * Call DialogComponent for update action / button Save
   *
   */
  openDialog(): void {
    console.log('inside openDialog');
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.ressourceHardwareDetail,
        type: 'studio',
        info: this.ressourceHardwareDetail.BarCode,
        action: 'update'
       }
    });

    dialogRef.afterClosed().subscribe(ressourceHardwareDetail => {
      if (ressourceHardwareDetail !== undefined) {
        this.ressourceHardwareService.updateRessourceHardware(ressourceHardwareDetail)
          .subscribe(serverData => {
            console.log(serverData);
            this.sharingVariableService.changeInfoSnackBar(serverData.newRH.BarCode + ' saved correctly !');
            console.log('The saveDialog was closed with saving');
          }
        );
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

}




