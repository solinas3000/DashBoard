import { Component, OnInit } from '@angular/core';
import { LineInfoComponent } from '../line-info/line-info.component';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { RackInfoComponent } from '../rack-info/rack-info.component';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { ElementHardware } from '../../../models/elementHardware.model';
import { LineDigitService } from '../../../service/line-digit.service';
import { DigitLine } from '../../../models/digitLine.model';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { DialogChangeComponent } from '../dialog-change/dialog-change.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-struct-digit-line',
  templateUrl: './struct-digit-line.component.html',
  styleUrls: ['./struct-digit-line.component.css']
})
export class StructDigitLineComponent implements OnInit {
  elementList: ElementHardware[];
  configLD: DigitLine;
  resetSearch: Observable<boolean>;

  constructor(private sharingVariableService: SharingVariableService, private lineDigitService: LineDigitService) {}

  ngOnInit() {
    this.resetSearch = this.sharingVariableService.getResetSearchPlayerAsOb()
    this.sharingVariableService.elementListSubject.subscribe(elementList => {
      this.elementList = elementList;
    });
    this.sharingVariableService.configLDSubject.subscribe(configLD => {
      this.configLD = configLD;
    });
  }

  gotoRH(item) {
    console.log(item);
    const val = '';
    const value = {
      ...this.sharingVariableService.searchTextValueSubject.getValue(),
      BarCodeS: item.BarCode,
      CategoryS: val
    };
    this.sharingVariableService.changeSearchTextValue(value);
    this.sharingVariableService.changeRessourCategorySelected(null);
    this.sharingVariableService.changeIndexTab(3);
  }

  removePlayer(player): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.configLD.ID_RessourceHardwareConfiguration,
        type: 'Player',
        info: player.BarCode,
        action: 'remove'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.lineDigitService.removePlayer(res).subscribe(serverData => {
          this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
          this.reloadPlayer(serverData);
        });
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  openDialogChange(data: any): void {
    const dialogRef = this.sharingVariableService.getDialog().open(DialogChangeComponent, {
      width: '250px',
      data: {
        type: data.type,
        OLD_ID_RessourceHardware: data.OLD_ID_RessourceHardware
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        if (res.function === 'goto') {
          this.gotoRH(res.rh);
        } else {
          if (res.type === 'Player') {
            this.playerChange(res);
          } else {
            this.elementChange(res);
          }
        }
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }

  elementChange(res) {
    console.log(this.configLD.Elements);
    console.log(res.OLD_ID_RessourceHardware);
    const data = {
      RessourceHardwareConfigurationElement: this.elementList.find(x => {
        return x.RessourceHardware.ID_RessourceHardware === res.OLD_ID_RessourceHardware;
      }),
      newRh: res.rh
    };
    this.lineDigitService.changeElement(data).subscribe(serverData => {
      this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
      this.reloadElement(serverData, res.OLD_ID_RessourceHardware);
    });
  }

  playerChange(res) {
    const data = {
      RessourceHardwareConfiguration: this.configLD,
      newPlayer: res.rh
    };
    this.lineDigitService.changePlayer(data).subscribe(serverData => {
      this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
      this.reloadPlayer(serverData);
    });
  }

  reloadPlayer(player) {
    const value = {
      ...this.configLD,
      RessourceHardwarePlayer: player
    };
    this.sharingVariableService.changeConfigLD(value);
  }

  reloadElement(element, OLD_ID_RessourceHardware) {
    this.elementList.find(x => {
      return x.RessourceHardware.ID_RessourceHardware === OLD_ID_RessourceHardware;
    }).RessourceHardware = element;
    this.sharingVariableService.changeElementList(this.elementList);
  }

  setDigitLine(player: RessourceHardware){
    this.lineDigitService.getElements(player.RessourceConfigurationPlayer[0].ID_RessourceHardwareConfiguration)
    .combineLatest(this.lineDigitService.loadLineDigits([player.RessourceConfigurationPlayer[0].ID_RessourceHardwareConfiguration]))
    .subscribe(serverData => {
      this.sharingVariableService.changeElementList(serverData[0]._items);
      this.sharingVariableService.changeConfigLD(serverData[1]._items[0]);
    });
  }

}
