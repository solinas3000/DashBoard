import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Workspace } from '../../../models/workSpace.model';
import { LineDigitService } from '../../../service/line-digit.service';
import { WorkspaceService } from '../../../service/poste-de-travail.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { DialogComponent } from '../../dialog/dialog.component';

  /**
   *
   * Component for each studio / called in template html struct-studio.component line 23
   *
   */
@Component({
  selector: 'app-worksp-studio',
  templateUrl: './worksp-studio.component.html',
  styleUrls: ['./worksp-studio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspStudioComponent implements OnInit {

  indexWorksp: number;
  workSpace: Workspace;

  @Input()
  set worksp(worksp: Workspace) {
    this.workSpace = worksp;
  }

  get worksp(): Workspace { return this.workSpace; }


  @Input()
  set index(index: number) {
    this.indexWorksp = index;
  }

  get index(): number { return this.indexWorksp; }


  constructor(private workSpaceService: WorkspaceService, private sharingVariableService: SharingVariableService, private lineDigitService: LineDigitService) { }

  ngOnInit() {
  }

  @Output('reload')
  reload: EventEmitter<Workspace> = new EventEmitter<Workspace>();


  gotoWorkSp() {
    this.lineDigitService.loadLineDigits(<number[]>this.workSpace.lineDigits).subscribe(serverData => {
      this.sharingVariableService.changeWorkspaceSelected(
        this.workSpace
      );
      if(serverData !== undefined){
        this.sharingVariableService.changeLineDigitList(serverData._items);
      }else{
        this.sharingVariableService.changeLineDigitList([]);
      }
    });
    this.sharingVariableService.changeIndexTab(1);
  }


  openDialogRemove(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
         source: this.workSpace.ID_RessourceStudio,
         type: 'poste de travail',
         info: this.workSpace.RessourceStudio_Name,
         action: 'remove'
        }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.workSpaceService.removeWorkSp(data)
        .subscribe((data) => {
          this.sharingVariableService.changeInfoSnackBar(data.RessourceStudio_Name + ' deleted correctly !');
          this.reload.emit(this.workSpace);
        });
        console.log('The saveDialog was closed with saving');
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

}
