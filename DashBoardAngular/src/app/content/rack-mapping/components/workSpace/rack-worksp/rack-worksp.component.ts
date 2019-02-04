import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Workspace } from '../../../models/workSpace.model';
import { RackForWorkSp } from '../../../models/rackForWorkSp.model';
import { DigitLine } from '../../../models/digitLine.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { LineDigitService } from '../../../service/line-digit.service';
  /**
   *Component to list Family-Rack
   */
@Component({
  selector: 'app-rack-worksp',
  templateUrl: './rack-worksp.component.html',
  styleUrls: ['./rack-worksp.component.css']
})
export class RackWorkspComponent implements OnInit {
  workSpaceSelect: Workspace;
  maxPosition: number;
  rack: RackForWorkSp;
  rackName: string;

  constructor(private sharingVariableService: SharingVariableService, private lineDigitService: LineDigitService) {}

  @Input()
  set rackForWorkSp(rackForWorkSp: RackForWorkSp) {
    this.rack = rackForWorkSp;
  }

  get rackForWorkSp(): RackForWorkSp {
    return this.rack;
  }

  @Input()
  set workSpaceSelected(workSpaceSelect: Workspace) {
    this.workSpaceSelect = workSpaceSelect;
  }

  get workSpaceSelected(): Workspace {
    return this.workSpaceSelect;
  }

  @Input()
  set max(max: number) {
    this.maxPosition = max;
    console.log(this.maxPosition);
  }

  get max(): number {
    return this.maxPosition;
  }

  @Output('reload') reloadInRack: EventEmitter<DigitLine> = new EventEmitter<DigitLine>();

  reload(event) {
    this.reloadInRack.emit(event);
  }

  @Output('save') saveP: EventEmitter<RackForWorkSp> = new EventEmitter<RackForWorkSp>();

  savePosition(event) {
    this.saveP.emit(event);
  }

  @Output('renameAllRack') renameAllR: EventEmitter<RackForWorkSp> = new EventEmitter<RackForWorkSp>();

  renameAllRack(event) {
    this.renameAllR.emit(event);
  }

  onPositionChanged(event) {
    this.rack.lineList.splice(event.newIndex, 0, this.rack.lineList.splice(event.oldIndex, 1)[0]);
  }
   /**
   *
   * Call DialogComponent for remove Rack Action
   *
   *
   */
  removeRack(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.rack,
        type: 'Rack',
        info: this.rack.name,
        action: 'remove'
      }
    });

    dialogRef.afterClosed().subscribe((rack: RackForWorkSp) => {
      if (rack !== undefined) {
        this.lineDigitService.removeRack(rack).subscribe(res => {
          this.sharingVariableService.changeInfoSnackBar(
            res + ' removed correctly !'
          );
          this.reload(rack.lineList[0].line.RessourceStudio);
          console.log('The saveDialog was closed with saving');
        });
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }
   /**
   *
   * Call DialogComponent for Save Position Or Rename Rack Action
   *
   *
   */
  openSavePosition(): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.rack,
        type: 'Rack Positions',
        info: this.rack.name,
        action: 'update'
      }
    });
    dialogRef.afterClosed().subscribe((rack: RackForWorkSp) => {
      this.savePosition(rack);
    });
  }

  ngOnInit() {}
}
