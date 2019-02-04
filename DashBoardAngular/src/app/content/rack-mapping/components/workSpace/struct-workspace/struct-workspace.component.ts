import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalSharingVariableService } from '../../../../../global-service/global-sharing-variable.service';
import { Utils } from '../../../../../util';
import { DigitLine } from '../../../models/digitLine.model';
import { RackForWorkSp } from '../../../models/rackForWorkSp.model';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { Workspace } from '../../../models/workSpace.model';
import { LineDigitService } from '../../../service/line-digit.service';
import { WorkspaceService } from '../../../service/poste-de-travail.service';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { DetailWorkspDynamicComponent } from '../detail-worksp-dynamic/detail-worksp-dynamic.component';
import { DialogAddLineComponent } from '../dialog-add-line/dialog-add-line.component';

interface PositionInRack {
  position: number;
  ID_line: number;
  nameRack: string;
  ID_rack: number;
}

interface CreateAndSavePosition {
  lineToAdd: {
    type: string;
    line: DigitLine;
  }[];
  racksPosition: PositionInRack[];
}
  /**
   *
   * Head of the DOM Tree for Poste de Travail Tab
   *
   *
   */
@Component({
  selector: 'app-struct-workspace',
  templateUrl: './struct-workspace.component.html',
  styleUrls: ['./struct-workspace.component.css']
})
export class StructWorkspaceComponent implements OnInit {
  regex: RegExp;
  workSpaceSelected: Workspace;
  lineDigitList: DigitLine[];
  rackForWorkSpList: RackForWorkSp[];
  rackForRackSelectList: RackForWorkSp[];
  rackSelected: RackForWorkSp;
  worksps: Workspace[];
  studios: string[];
  racksInSelectedWorkSp: RessourceHardware[];

  constructor(
    private workSpaceService: WorkspaceService,
    private lineDigitService: LineDigitService,
    private ressourceHardwareService: RessourceHardwareService,
    private sharingVariableService: SharingVariableService,
    private globalSharingVariableService: GlobalSharingVariableService
  ) {
    this.regex = this.sharingVariableService.regex;
  }

  @Input('refresh')
  set refresh(value: boolean) {
    console.log(this.rackSelected);
    if (value && this.workSpaceSelected) {
      this.reload();
    }
  }

  /**
   * @ignore
   */
  ngOnInit() {
    console.log('in init struct worksp');
    this.sharingVariableService.workspsSubject.subscribe(worksps => {
      this.worksps = worksps.filter(x => x.RessourceStudio_Name != 'STANDBY');
      this.studios = this.worksps
        .map(x => {
          return x.RessourceStudio_Code;
        })
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(x => x != 'STANDBY');
    });
    this.sharingVariableService.workSpaceSelectedSubject.subscribe(workSpaceSelected => {
      console.log("in subscribe workSpaceSelected", workSpaceSelected)
      this.workSpaceSelected = workSpaceSelected;
    });
    this.sharingVariableService.lineDigitListSubject.subscribe(lineDigitList => {
      this.lineDigitList = lineDigitList;
      this.racksInSelectedWorkSp = lineDigitList.map(x => x.RessourceHardwareRack)
    });
    this.sharingVariableService.rackListForWorkSpSubject.subscribe(rackForWorkSpList => {
      this.rackForRackSelectList = rackForWorkSpList;
      this.rackForWorkSpList = rackForWorkSpList;
    });
  }

  selectionWorkSp(event): Observable<any> {
    console.log('selectedWorkSpEvent', event);
    return this.workSpaceService.getWorkSpWithName(event.RessourceStudio_Name).mergeMap(poste => {
      this.racksInSelectedWorkSp = (<DigitLine[]>poste.lineDigits).map(x => x.RessourceHardwareRack);
      const toMap = <DigitLine[]>poste.lineDigits;
      if (toMap.length > 0) {
        return this.lineDigitService.loadLineDigits(
          toMap.map(x => {
            return x.ID_RessourceHardwareConfiguration;
          })
        );
      } else {
        return Observable.of(undefined) as Observable<any>;
      }
    });
  }

  selectedWorkSp(event) {
    event = event.value;
    this.selectionWorkSp(event).subscribe(serverData => {
      console.log('in subscribe selectedWorkSp', serverData);
      this.rackSelected = undefined;
      if(serverData !== undefined){
        this.sharingVariableService.changeLineDigitList(serverData._items);
      }else{
        this.sharingVariableService.changeLineDigitList([]);
      }
      this.sharingVariableService.changeWorkspaceSelected(event);

    });
  }

  selectedRack(event) {
    event = event.value;
    this.selectionRack(event);
  }

  selectionRack(event) {
    console.log(event);
    if (event === undefined) {
      this.rackForWorkSpList = this.rackForRackSelectList;
    } else {
      this.rackForWorkSpList = [];
      this.rackForWorkSpList.push(event);
      this.rackSelected = this.rackForRackSelectList.find(x => x.name === event.name);
    }
  }

  reload() {
    this.selectionWorkSp(this.workSpaceSelected).subscribe(serverData => {
      console.log('in subscribe selectedWorkSp', serverData);
      if(serverData !== undefined){
        this.sharingVariableService.changeLineDigitList(serverData._items);
      }else{
        this.sharingVariableService.changeLineDigitList([]);
      }
      this.selectionRack(this.rackSelected);
    });
  }

  gotoStudio() {
    this.sharingVariableService.changeStudioSelected(this.workSpaceSelected.RessourceStudio_Code);
    this.workSpaceService
      .getWorkSpsWithName(this.workSpaceSelected.RessourceStudio_Code)
      .subscribe(serverData => {
        this.sharingVariableService.changeWorkspaceStudioList(serverData._items);
      });
    this.sharingVariableService.changeIndexTab(0);
  }

  openSideNav() {
    const value = {
      component: DetailWorkspDynamicComponent,
      variable: this.rackForWorkSpList
    };
    this.globalSharingVariableService.changeOpenEndSideNav(value);
  }

  openDialogWorkSp(): void {
    //this.workSpaceSelected.RessourceStudio_CreationDate = this.workSpaceSelected.RessourceStudio_CreationDate.slice(0,22).concat('Z')
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.workSpaceSelected,
        type: 'poste de travail',
        info: this.workSpaceSelected.RessourceStudio_Name,
        action: 'update'
      }
    });

    dialogRef.afterClosed().subscribe(workSpaceSelected => {
      if (workSpaceSelected !== undefined) {
        this.workSpaceService.updateWorkspace(workSpaceSelected).subscribe(serverData => {
          console.log(serverData);
          this.sharingVariableService.changeInfoSnackBar(serverData.RessourceStudio_Name + ' saved correctly !');
          console.log('The saveDialog was closed with saving');
        });
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  saveRacks(rack: RackForWorkSp) {
    const body = {
      ID_RessourceStudio: this.workSpaceSelected.ID_RessourceStudio,
      name: rack.name,
      list: this.configureModelPositionInRack(rack)
    }
    this.lineDigitService.updatePositionsInRack(body).subscribe(res => {
      this.sharingVariableService.changeInfoSnackBar(
        res.BarCode.replace(/[\x2d| ]\d{1,3}$/, '') + ' saved correctly !'
      );
      this.reload();
    });
  }

  configureModelPositionInRack(rack: RackForWorkSp): any {
    const list: PositionInRack[] = [];
    rack.lineList.forEach((elt, index) => {
      const item: PositionInRack = {
        position: 0,
        ID_line: -1,
        nameRack: '',
        ID_rack: -1
      };
      item.position = index + 1;
      item.ID_line = elt.line.ID_RessourceHardwareConfiguration;
      item.nameRack = rack.name.replace(/STANDBY/g, '') + '-' + Utils.lpad(index + 1, 3);
      item.ID_rack = elt.line.RessourceHardwareRack.ID_RessourceHardware;
      list.push(item);
    });
    return list;
  }

  openAddLine(index): void {
    console.log(this.workSpaceSelected);
    let dialogRef;
    this.ressourceHardwareService.getRackInRackMapping().subscribe(result => {
      dialogRef = this.sharingVariableService.getDialog().open(DialogAddLineComponent, {
        width: '250px',
        data: {
          racks: result._items,
          racksInSelectedWorkSp: this.racksInSelectedWorkSp
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data !== undefined) {
          this.createNewLine(data);
        }
      });
    })
  }

  createNewLine(data) {
    data.line.ID_RessourceStudio = this.workSpaceSelected.ID_RessourceStudio;
    if (data.line.ID_RessourceHardwareConfiguration === undefined) data.line.ID_RessourceHardwareConfiguration = -1;
    const barCode = data.line.RessourceHardwareRack.BarCode.replace(/STANDBY/g, '');
    if (
      this.rackForWorkSpList
        .map(x => {
          return x.name;
        })
        .includes(barCode.replace(/[\x2d| ]\d{1,3}$/, ''))
    ) {
      this.rackForWorkSpList
        .find(x => {
          return x.name === barCode.replace(/[\x2d| ]\d{1,3}$/, '');
        })
        .lineList.splice(data.line.Position, 0, data);
      data.line.RessourceHardwareRack.BarCode = /[\x2d| ]\d{1,3}/.test(barCode)
        ? barCode.replace(/[\x2d| ]\d{1,3}/, '-' + Utils.lpad(data.line.Position + 1, 3))
        : barCode + '-' + data.line.Position;
      this.createLineAndSavePosition(data);
    } else {
      data.line.Position = 1;
      data.line.RessourceHardwareRack.BarCode = /[\x2d| ]\d{1,3}/.test(barCode)
        ? barCode.replace(/[\x2d| ]\d{1,3}/, '-' + Utils.lpad(1, 3))
        : barCode + '-1';
      this.addNewLine(data);
    }
  }

  createLineAndSavePosition(data) {
    const name = data.line.RessourceHardwareRack.BarCode.replace(/[\x2d| ]\d{1,3}$/, '').replace(/STANDBY/, '');
    const value: RackForWorkSp = {
      name: name,
      lineList: this.rackForWorkSpList.find(x => {
        return x.name === name;
      }).lineList
    };
    console.log(value);
    const rackP = this.configureModelPositionInRack(value);
    const model: CreateAndSavePosition = {
      lineToAdd: [],
      racksPosition: rackP
    };
    model.lineToAdd.push(data);
    this.lineDigitService.createLineAndSavePosition(model).subscribe(serverData => {
      this.sharingVariableService.changeInfoSnackBar(serverData.RessourceStudio_Name + ' saved correctly !');
      this.reload();
    });
  }

  addNewLine(data) {
    const rackP: PositionInRack[] = [];
    const item: PositionInRack = {
      position: 1,
      ID_line: -1,
      nameRack: data.line.RessourceHardwareRack.BarCode,
      ID_rack: data.line.RessourceHardwareRack.ID_RessourceHardware
    };
    rackP.push(item)
    const model: CreateAndSavePosition = {
      lineToAdd: [],
      racksPosition: rackP
    };
    model.lineToAdd.push(data);
    this.lineDigitService.createLineAndSavePosition(model).subscribe(serverData => {
      this.sharingVariableService.changeInfoSnackBar(serverData.RessourceStudio_Name + ' saved correctly !');
      this.reload();
    });
  }
}
