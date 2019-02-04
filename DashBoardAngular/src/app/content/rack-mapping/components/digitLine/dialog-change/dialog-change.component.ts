import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { LineDigitService } from '../../../service/line-digit.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { Utils } from '../../../../../util';

@Component({
  selector: 'dialogChange',
  templateUrl: './dialog-change.component.html',
  styleUrls: ['./dialog-change.component.css']
})
export class DialogChangeComponent {
  typeRH: string;
  OLD_ID_RessourceHardware: number;
  barCodeNotInUseSubject = new BehaviorSubject<string>('');
  barCodeInUseSubject = new BehaviorSubject<string>('');
  barCodeNotInUse: string;
  barCodeInUse: string;
  rhNotInUseList: RessourceHardware[];
  rhInUseList: RessourceHardware[];
  selectedNotInUseRH: RessourceHardware;
  selectedInUseRH: RessourceHardware;
  rhChoosenInUse = false;
  rhChoosenNotInUse = false;

  constructor(
    private sharingVariableService: SharingVariableService,
    private ressourceHardwareService: RessourceHardwareService,
    private lineDigitService: LineDigitService,
    public dialogRef: MatDialogRef<DialogChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.OLD_ID_RessourceHardware = data.OLD_ID_RessourceHardware;
    this.typeRH = data.type;
    this.rhNotInUseSearch();
    this.rhInUseSearch();
  }

  rhInUseSearch() {
    this.barCodeInUseSubject
      .debounceTime(500)
      .map(barCode => {
        this.barCodeInUse = barCode;
        return barCode;
      })
      .mergeMap(barCode => {
        if (this.typeRH === 'Player') {
          return this.ressourceHardwareService.getPlayerInUse(this.barCodeInUse);
        } else {
          return this.ressourceHardwareService.getRhInUse(this.barCodeInUse, this.typeRH);
        }
      })
      .map(({ _items }) =>
        _items.filter(x => {
          if (this.typeRH === 'Player') {
            return x.RessourceConfigurationPlayer[0].Installed === true;
          } else {
            return x.Elements.length > 0;
          }
        })
      )
      .subscribe(serverData => {
        this.rhInUseList = serverData;
        this.selectedInUseRH = this.rhInUseList.find(x => x.BarCode === this.barCodeInUse);
        this.disableRhNotInUse();
      });
  }

  rhNotInUseSearch() {

    let rhNotInUse;
    let rhInStandBy;
    this.barCodeNotInUseSubject
      .debounceTime(500)
      .map(barCode => {
        this.barCodeNotInUse = barCode;
        return barCode;
      })
      .mergeMap(barCode => {
        if (this.typeRH === 'Player') {
          return this.ressourceHardwareService.getPlayerNotInUse(this.barCodeNotInUse);
        } else {
          return this.ressourceHardwareService.getRhNotInUse(this.barCodeNotInUse, this.typeRH);
        }
      })
      .map(({ _items }) => _items)
      .combineLatest(
        this.lineDigitService.loadLineDigitsInStandBy().map(({ _items }) =>
          _items.map(x => {
            if (this.typeRH === 'Player') {
              return x.RessourceHardwarePlayer;
            } else {
              return x.Elements.map(x => x.RessourceHardware).filter(x => {return x.Category === this.typeRH});
            }
          })
        )
      )
      .subscribe(serverData => {
        const rhNotInUse = serverData['0'];
        const rhInStandBy = serverData['1']
        console.log("rhinstandby",rhInStandBy)
        this.rhNotInUseList = [...rhNotInUse, ...Utils.flat(rhInStandBy)].filter(x => {
          return x.BarCode.toLowerCase().search(new RegExp(`${this.barCodeNotInUse.toLowerCase()}`)) >= 0;
        })
        this.selectedNotInUseRH = this.rhNotInUseList.find(x => x.BarCode === this.barCodeNotInUse);
        this.disableRhInUse();
      });
  }

  gotoRh(): void {
    if (this.selectedInUseRH !== undefined) {
      const value = {
        function: 'goto',
        rh: this.selectedInUseRH,
        type: this.typeRH,
        OLD_ID_RessourceHardware: this.OLD_ID_RessourceHardware
      };
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.selectedNotInUseRH !== undefined) {
      const value = {
        function: 'change',
        rh: this.selectedNotInUseRH,
        type: this.typeRH,
        OLD_ID_RessourceHardware: this.OLD_ID_RessourceHardware
      };
      this.dialogRef.close(value);
    }
  }

  onKeyBarCodeRhInUse(BarCode: string): void {
    this.barCodeInUseSubject.next(BarCode);
  }

  onKeyBarCodeRhNotInUse(barCode: string): void {
    this.barCodeNotInUseSubject.next(barCode);
  }

  selectRhInUse(event): void {
    this.selectedInUseRH = this.rhInUseList.find(x => x.BarCode === event.option.value);
    this.disableRhNotInUse();
  }

  selectRhNotInUse(event): void {
    this.selectedNotInUseRH = this.rhNotInUseList.find(x => x.BarCode === event.option.value);
    this.disableRhInUse();
  }

  disableRhInUse() {
    if (this.selectedNotInUseRH !== undefined) {
      this.rhChoosenNotInUse = true;
    } else {
      this.rhChoosenNotInUse = false;
    }
  }

  disableRhNotInUse() {
    if (this.selectedInUseRH !== undefined) {
      this.rhChoosenInUse = true;
    } else {
      this.rhChoosenInUse = false;
    }
  }
}
