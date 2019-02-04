import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Workspace } from '../../../models/workSpace.model';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { LineDigitService } from '../../../service/line-digit.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-line-info',
  templateUrl: './line-info.component.html',
  styleUrls: ['./line-info.component.css']
})
export class LineInfoComponent implements OnInit {
  rackName: string;
  pos: number;
  installDate: string;
  workspSelect: Workspace;
  playerList: RessourceHardware[];
  playerChoosen: boolean = false;
  barCodeInUseSubject = new BehaviorSubject<string>('');
  barCodeInUse: string;
  selectedPlayer: RessourceHardware;

  @Output('setDigitLine') setDigitLine: EventEmitter<RessourceHardware> = new EventEmitter<RessourceHardware>();

  @Input()
  set resetSearch(reset: boolean){
    console.log(reset);
    if(reset){
      this.barCodeInUseSubject.next('');
      this.playerChoosen = false;
      this.sharingVariableService.changeResetSearchPlayer(false)
    }
  }
  @Input()
  set BarCode(rackName: string) {
    this.rackName = rackName;
  }

  get BarCode(): string {
    return this.rackName;
  }

  @Input()
  set Position(pos: number) {
    this.pos = pos;
  }

  get Position(): number {
    return this.pos;
  }

  @Input()
  set InstalledDate(installDate: string) {
    this.installDate = installDate;
  }

  get InstalledDate(): string {
    return this.installDate;
  }

  @Input()
  set workSpace(worksp: Workspace) {
    this.workspSelect = worksp;
  }

  get workSpace(): Workspace {
    return this.workspSelect;
  }

  constructor(
    private sharingVariableService: SharingVariableService,
    private lineDigitService: LineDigitService,
    private ressourceHardwareService: RessourceHardwareService
  ) {}

  ngOnInit() {
    this.playerSearchInit();
  }

  gotoWorkSp() {
    console.log(this.workspSelect);
    this.lineDigitService.loadLineDigits(<number[]>this.workspSelect.lineDigits).subscribe(serverData => {
      this.sharingVariableService.changeWorkspaceSelected(
        this.sharingVariableService.workspsSubject
          .getValue()
          .find(x => x.ID_RessourceStudio === this.workspSelect.ID_RessourceStudio)
      );
      this.sharingVariableService.changeLineDigitList(serverData._items);
    });
    this.sharingVariableService.changeIndexTab(1);
  }
  selectPlayer(event) {
    this.selectedPlayer = this.playerList.find(x => x.BarCode === event.option.value);
    this.choosedPlayer();
  }

  onKeySearchPlayer(BarCode: string): void {
    this.barCodeInUseSubject.next(BarCode);
  }

  playerSearchInit() {
    this.barCodeInUseSubject
      .debounceTime(500)
      .map(barCode => {
        this.barCodeInUse = barCode;
        return barCode;
      })
      .mergeMap(barCode => {
        return this.ressourceHardwareService.getPlayerInUse(this.barCodeInUse);
      })
      .map(({ _items }) =>
        _items.filter(x => {
          return x.RessourceConfigurationPlayer[0].Installed === true;
        })
      )
      .subscribe(serverData => {
        console.log('in subscribe search player', serverData);
        this.playerList = serverData;
        this.selectedPlayer = this.playerList.find(x => x.BarCode === this.barCodeInUse);
      });
    this.choosedPlayer();
  }

  choosedPlayer() {
    if (this.selectedPlayer !== undefined) {
      this.playerChoosen = true;
      this.setDigitLine.emit(this.selectedPlayer);
    } else {
      this.playerChoosen = false;
    }
  }
}
