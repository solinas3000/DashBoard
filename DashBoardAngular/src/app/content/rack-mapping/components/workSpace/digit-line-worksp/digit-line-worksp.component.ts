import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { DigitLine } from '../../../models/digitLine.model';
import { WorkspaceService } from '../../../service/poste-de-travail.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Workspace } from '../../../models/workSpace.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { LineDigitService } from '../../../service/line-digit.service';
import { DatePipe } from '@angular/common';
import { SubStandbyPipe } from '../../../pipes/sub-standby.pipe';
interface ForPositionChanged {
  oldIndex: number;
  newIndex: number;
}
  /**
   *Component to list Digit Line in each Family-Rack
   */
@Component({
  selector: 'app-digit-line-worksp',
  templateUrl: './digit-line-worksp.component.html',
  styleUrls: ['./digit-line-worksp.component.css']
})
export class DigitLineWorkspComponent implements OnInit {
  workSpaceSelect: Workspace;
  worksps: Workspace[];
  line: DigitLine;
  indexPosition: number;
  maxPosition: number;

  @Input()
  set max(max: number) {
    this.maxPosition = max;
    console.log(this.maxPosition);
  }

  get max(): number {
    return this.maxPosition;
  }

  @Input()
  set index(index: number) {
    console.log(index);
    this.indexPosition = index;
  }

  get index(): number {
    return this.indexPosition;
  }

  @Input()
  set digitLine(line: any) {
    this.line = line.line;
  }

  get digitLine(): any {
    return this.line;
  }

  @Input()
  set workSpaceSelected(workSpaceSelect: Workspace) {
    this.workSpaceSelect = workSpaceSelect;
  }

  get workSpaceSelected(): Workspace {
    return this.workSpaceSelect;
  }

  @Output('reload') reload: EventEmitter<DigitLine> = new EventEmitter<DigitLine>();

  @Output('onPositionChanged')
  onPositionChanged: EventEmitter<ForPositionChanged> = new EventEmitter<ForPositionChanged>();

  constructor(
    private workSpaceService: WorkspaceService,
    private sharingVariableService: SharingVariableService,
    private lineDigitService: LineDigitService,
    private subStandbyPipe: SubStandbyPipe
  ) {}

  ngOnInit() {
    this.sharingVariableService.workspsSubject.subscribe(worksps => {
      this.worksps = worksps;
    });
  }

  onKeyPosition(event) {
    console.log(event);
    const val: ForPositionChanged = {
      oldIndex: this.indexPosition,
      newIndex: event - 1
    };
    this.onPositionChanged.emit(val);
  }

  gotoLine() {
    this.lineDigitService.getElements(this.line.ID_RessourceHardwareConfiguration).subscribe(serverData => {
      this.sharingVariableService.changeElementList(serverData._items);
      this.sharingVariableService.changeConfigLD(this.line);
      this.sharingVariableService.changeResetSearchPlayer(true);
    });
    this.sharingVariableService.changeIndexTab(2);
  }

  openRemove(): void {
    console.log('inside openRemove');
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.line,
        type: 'line Digit',
        info: this.line.RessourceHardwareRack.BarCode + ' / ' + this.line.RessourceHardwarePlayer.BarCode,
        action: 'remove'
      }
    });

    dialogRef.afterClosed().subscribe(line => {
      if (line !== undefined) {
        line.ID_RessourceStudio = this.workSpaceSelect.ID_RessourceStudio;
        console.log(line);
        //move the logic in struct and call updatePosition
        this.lineDigitService.removeLineDigit(line).subscribe(line => {
          console.log(line);
          this.sharingVariableService.changeInfoSnackBar('Digit Line ' + this.subStandbyPipe.transform(line.BarCode) + ' removed correctly !');
          console.log('The openRemove was closed with saving');
          this.reload.emit(this.line);
        });
      } else {
        console.log('The openRemove was closed without saving');
      }
    });
  }
}
