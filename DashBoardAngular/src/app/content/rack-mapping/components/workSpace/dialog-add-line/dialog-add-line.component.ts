import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DigitLine } from '../../../models/digitLine.model';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { LineDigitService } from '../../../service/line-digit.service';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { Utils } from '../../../../../util';

interface Data {
  racks: RessourceHardware[];
  racksInSelectedWorkSp: RessourceHardware[];
}
  /**
   *Dialog Component to Add a new line / called only in struct-poste-de-travail.component.ts line 223 openAddLine()
   */
@Component({
  selector: 'app-dialog-add-line',
  templateUrl: './dialog-add-line.component.html',
  styleUrls: ['./dialog-add-line.component.css']
})
export class DialogAddLineComponent {
  rackNameInRM: string[];
  regex: RegExp;
  barCodeRackSubject = new BehaviorSubject<string>('');
  barCodePlayerSubject = new BehaviorSubject<string>('');
  disableChoose = false;
  barCodeRackS: string;
  barCodePlayerS: string;
  lineStandbyList: DigitLine[];
  selectedLineStandBy: DigitLine;
  rhRackList: RessourceHardware[];
  rhPlayerList: RessourceHardware[];
  selectedRackRH: RessourceHardware;
  selectedPlayerRH: RessourceHardware;
  playersInStandBy: RessourceHardware[];
  rackInStandBy: RessourceHardware[];
  positionChoosen: number = 1;

  constructor(
    private sharingVariableService: SharingVariableService,
    private lineDigitService: LineDigitService,
    private ressourceHardwareService: RessourceHardwareService,
    public dialogRef: MatDialogRef<DialogAddLineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    this.regex = this.sharingVariableService.regex;

    this.getLineStandBy(data).subscribe(x => {
      this.lineStandbyList = x;
    });

    this.barCodeRackSubject
      .debounceTime(500)
      .map(barCode => {
        this.barCodeRackS = barCode;
        return barCode;
      })
      .mergeMap(barCode => this.ressourceHardwareService.getRackForAddLine(barCode))
      .combineLatest(this.lineDigitService.loadLineDigitsInStandBy())
      .subscribe(serverData => {
        const rackToRemove = this.getRackNameToRemove(data);
        const rackNotInUse = serverData['0']._items.filter(x => {
          return x.RessourceConfigurationRack.length == 0;
        });
        this.rackInStandBy = serverData['1']._items
          .map(x => {
            return x.RessourceHardwareRack;
          })
          .filter(x => {
            if (x.BarCode !== undefined) {
              return x.BarCode.toLowerCase().search(new RegExp(`${this.barCodeRackS.toLowerCase()}`)) >= 0;
            }
          });

        this.rhRackList = [...rackNotInUse, ...this.rackInStandBy]
          .filter(x => {
            return x.BarCode !== 'STANDBY';
          })
          .filter(x => {
            return !(rackToRemove.indexOf(x.BarCode.match(this.regex)[1]) > -1);
          });

        this.selectedRackRH = this.rhRackList.find(x => x.BarCode === this.barCodeRackS);
      });

    this.barCodePlayerSubject
      .debounceTime(500)
      .map(barCode => {
        this.barCodePlayerS = barCode;
        return barCode;
      })
      .mergeMap(barCode => this.ressourceHardwareService.getPlayerNotInUse(barCode))
      .map(({ _items }) => _items)
      .combineLatest(this.lineDigitService.loadLineDigitsInStandBy()
      .map(({ _items }) => _items.map(x => {
        return x.RessourceHardwarePlayer
      })))
      .subscribe(serverData => {
        const playersNotInUse = serverData['0'];
        this.playersInStandBy = serverData['1'];
        this.rhPlayerList = [...playersNotInUse, ...Utils.flat(this.playersInStandBy)].filter(x => {
          return x.BarCode.toLowerCase().search(new RegExp(`${this.barCodePlayerS.toLowerCase()}`)) >= 0;
        })
        this.selectedPlayerRH = this.rhPlayerList.find(x => x.BarCode === this.barCodePlayerS);
      });
  }


  /**
   * @get line StandBy form server and filter by rack name in use in the Rack Mapping except in use in the selected workspace
   * @param  {Data} data - data.racks and data.racksInSelectedWorkSp
   *
   */
  getLineStandBy(data: Data) {
    const rackToRemove = this.getRackNameToRemove(data);
    return this.lineDigitService.loadLineDigitsInStandBy().map(serverData => {
      return serverData._items
        .filter(x => {
          return x.RessourceHardwareRack.BarCode !== undefined;
        })
        .filter(x => {
          return !(rackToRemove.indexOf(x.RessourceHardwareRack.BarCode.match(this.regex)[1]) > -1);
        });
    });
  }

  getRackNameToRemove(data: Data) {
    const filterStandby: string[] = [];
    const result: string[] = [];
    console.log(data.racks)
    data.racks.forEach(x => {
      if(!(/STANDBY.*/.test(x.BarCode)) && x.BarCode !== undefined){
        result.push(x.BarCode.match(this.regex)[1]);
      }
    });
    data.racksInSelectedWorkSp.forEach(x => {
        filterStandby.push(x.BarCode.match(this.regex)[1]);
      }
    );
    const filterStandByUnique = Array.from(new Set(filterStandby));
    const resultUnique = Array.from(new Set(result));
    console.log(filterStandByUnique)
    console.log(resultUnique.filter(x => {
      return !(filterStandByUnique.indexOf(x) > -1);
    }))
    return resultUnique.filter(x => {
      return !(filterStandByUnique.indexOf(x) > -1);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.disableChoose) {
      this.selectedLineStandBy.Position = this.positionChoosen-1;
      const value = {
        type: 'STANDBY',
        line: this.selectedLineStandBy
      };
      this.dialogRef.close(value);
    } else {
      if (this.selectedRackRH && this.selectedPlayerRH) {
        console.log(this.selectedRackRH);
        console.log(this.selectedPlayerRH);
        const now = new Date();
        let line = {
          RessourceHardwareRack: this.selectedRackRH,
          ID_RessourceHardwarePlayer: this.selectedPlayerRH.ID_RessourceHardware,
          ID_RessourceStudio: -1,
          Position: this.positionChoosen-1,
          InstalledDate: now.toISOString(),
          Installed: 1,
          Old_ID_RessourceHardwareConfiguration_Player: null,
          Old_ID_RessourceHardwareConfiguration_Rack: null
        };
        let type = 'NEW';
        const PlyInStand: boolean = this.playersInStandBy.includes(this.selectedPlayerRH);
        const RaInStand: boolean = this.rackInStandBy.includes(this.selectedRackRH);
        if (PlyInStand && RaInStand) {
          type = 'NEWRPS';
          line.Old_ID_RessourceHardwareConfiguration_Rack = this.selectedRackRH.RessourceConfigurationRack[0].ID_RessourceHardwareConfiguration;
          line.Old_ID_RessourceHardwareConfiguration_Player = this.selectedPlayerRH.RessourceConfigurationPlayer[0].ID_RessourceHardwareConfiguration;
        } else if (RaInStand) {
          type = 'NEWRS';
          line.Old_ID_RessourceHardwareConfiguration_Rack = this.selectedRackRH.RessourceConfigurationRack[0].ID_RessourceHardwareConfiguration;
        } else if (PlyInStand) {
          type = 'NEWPS';
          line.Old_ID_RessourceHardwareConfiguration_Player = this.selectedPlayerRH.RessourceConfigurationPlayer[0].ID_RessourceHardwareConfiguration;
        }
        const value = {
          type: type,
          line: line
        };
        this.dialogRef.close(value);
      }
    }
  }

  onKeyBarCodeRack(BarCode: string) {
    this.barCodeRackSubject.next(BarCode);
  }
  onKeyBarCodePlayer(BarCode: string) {
    this.barCodePlayerSubject.next(BarCode);
  }

  lineStandbySelected(event) {
    if (event.value === undefined) {
      this.disableChoose = false;
    } else {
      this.disableChoose = true;
    }
    console.log(this.disableChoose);
  }

  selectRackRH(event) {
    this.selectedRackRH = this.rhRackList.find(x => x.BarCode === event.option.value);
  }
  selectPlayerRH(event) {
    this.selectedPlayerRH = this.rhPlayerList.find(x => x.BarCode === event.option.value);
  }
}
