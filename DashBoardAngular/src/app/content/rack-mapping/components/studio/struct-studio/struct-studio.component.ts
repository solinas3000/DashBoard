import { Component, OnInit, Inject } from '@angular/core';
import { Workspace } from '../../../models/workSpace.model';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { WorkspaceService } from '../../../service/poste-de-travail.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

/**
 *
 * Component for the tab Studio
 *
 */
@Component({
  selector: 'app-struct-studio',
  templateUrl: './struct-studio.component.html',
  styleUrls: ['./struct-studio.component.css']
})
export class StructStudioComponent implements OnInit {
  studioList: string[];
  studioSelected: string;
  workSpaceList: Workspace[];
  constructor(
    private sharingVariableService: SharingVariableService,
    private workSpaceService: WorkspaceService
  ) {}

  ngOnInit() {
    this.workSpaceService.getWorkSps().subscribe(serverData => {
      this.sharingVariableService.changeWorksps(serverData._items);
    });
    this.sharingVariableService.workSpaceStudioListSubject.subscribe(res => {
      this.workSpaceList = res;
    });
    this.sharingVariableService.workspsSubject.subscribe(res => {
      this.studioList = res
        .map(x => {
          return x.RessourceStudio_Code;
        })
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(x => x != 'STANDBY');
    });
    this.sharingVariableService.studioSelectedSubject.subscribe(res => {
      this.studioSelected = res;
    });
  }

  selectedStudio(event) {
    this.workSpaceService.getWorkSpsWithName(event).subscribe(serverData => {
      this.sharingVariableService.changeWorkspaceStudioList(serverData._items);
      this.sharingVariableService.changeStudioSelected(event);
    });
  }

  reload(worksp) {
    this.workSpaceService.getWorkSps().subscribe(res => {
      this.sharingVariableService.changeWorksps(res._items);
      this.sharingVariableService.changeStudioSelected(worksp.RessourceStudio_Code);
      this.selectedStudio(worksp.RessourceStudio_Code);
    });
  }

  // call popup NewStudio

  openDialogNewStudio(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogNewStudio, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.workSpaceService.addWorkSp(data).subscribe(worksp => {
          this.sharingVariableService.changeInfoSnackBar(worksp.RessourceStudio_Code + ' saved correctly !');
          this.reload(worksp);
        });
        console.log('The saveDialog was closed with saving');
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  // call popup Remove Studio

  openDialogRemove(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.workSpaceList.map(x => x.ID_RessourceStudio),
        type: 'studio',
        info: this.studioSelected,
        action: 'remove'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.workSpaceService
          .removeWorkSps(data)
          .subscribe(res => {
            console.log(res)
            let listInString: String = ' '
            res.forEach(x => {
              listInString += x.RessourceStudio_Name+' '
            })
            this.sharingVariableService.changeInfoSnackBar(listInString+ ' deleted correctly !');
            this.reload(this.workSpaceList[0]);
          });
        console.log('The saveDialog was closed with saving');
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  // call popup New Line

  openNewLine(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogNewWorkSp, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        data.RessourceStudio_Code = this.studioSelected;
        this.workSpaceService.addWorkSp(data).subscribe(worksp => {
          this.sharingVariableService.changeInfoSnackBar(worksp.RessourceStudio_Name + ' saved correctly !');
          this.reload(worksp);
        });
        console.log('The saveDialog was closed with saving');
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }
}

// popup definition

@Component({
  selector: 'dialog-new-line',
  templateUrl: 'dialogNewWorkSp.html'
})
export class DialogNewWorkSp {
  worksp: string;
  constructor(public dialogRef: MatDialogRef<DialogNewWorkSp>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const now = new Date();
    const worksp: Workspace = {
      ID_RessourceStudio: -1,
      RessourceStudio_Code: '',
      RessourceStudio_Name: this.worksp,
      RessourceStudio_Active: true,
      RessourceStudio_CreationDate: now.toISOString(),
      RessourceStudio_LastModificationDate: null,
      lineDigits: []
    };
    this.dialogRef.close(worksp);
  }
}

@Component({
  selector: 'dialog-new-studio',
  templateUrl: 'dialogNewStudio.html'
})
export class DialogNewStudio {
  studio: string;
  worksp: string;
  constructor(public dialogRef: MatDialogRef<DialogNewStudio>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const now = new Date();
    const worksp: Workspace = {
      ID_RessourceStudio: -1,
      RessourceStudio_Code: this.studio,
      RessourceStudio_Name: this.worksp,
      RessourceStudio_Active: true,
      RessourceStudio_CreationDate: now.toISOString(),
      RessourceStudio_LastModificationDate: null,
      lineDigits: []
    };
    this.dialogRef.close(worksp);
  }
}
