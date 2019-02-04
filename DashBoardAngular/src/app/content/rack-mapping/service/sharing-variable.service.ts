import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { GlobalSharingVariableService } from '../../../global-service/global-sharing-variable.service';
import { ElementHardware } from '../models/elementHardware.model';
import { DigitLine } from '../models/digitLine.model';
import { Workspace } from '../models/workSpace.model';
import { RackForWorkSp } from '../models/rackForWorkSp.model';
import { RessourceCategory } from '../models/ressourceCategory.model';
import { SearchTextValue } from '../models/searchTextValue.model';
import { ServerDataRessourceHardware } from '../models/ServerDataRessourceHardware.model';
import { SubStandbyPipe } from '../pipes/sub-standby.pipe';

/**
 *
 * Service to handle all sharing variables relative to the RackMapping Page / just import this service in your component to use all this variables /
 * subcribe to the variable via this.globalSharingVariableService.myVariableSubject.subscribe(value => this.myvalue = value) / change them via changeVariable(myNewValue: any)
 *
 *
 */
@Injectable()
export class SharingVariableService {
  regex: RegExp;
  searchTextValue = {
    BrandS: '',
    BarCodeS: '',
    CategoryS: '',
    ModelS: '',
    SerialNumberS: '',
    TypeS: ''
  };

  constructor(
    private dialog: MatDialog,
    private globalSharingVariableService: GlobalSharingVariableService,
    private subStandby: SubStandbyPipe
  ) {
    // regex for rack barcode
    this.regex = /^(?:[STANDBY]+)?(\w*[\x2d| ]?(?!\d{1,3})\w*)[\x2d| ]?(\d{1,3})?(?!\w)/;
  }

  changeInfoSnackBar(infoSnackBar: string) {
    this.globalSharingVariableService.infoSnackBarSubject.next(this.subStandby.transform(infoSnackBar));
  }

  getDialog(): MatDialog {
    this.dialog.closeAll();
    return this.dialog;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  workSpaceSelectedSubject = new Subject<Workspace>();

  changeWorkspaceSelected(workSpaceSelected: Workspace) {
    this.workSpaceSelectedSubject.next(workSpaceSelected);
    console.log('IN CHG POSTESELECTED', workSpaceSelected);
  }

  lineDigitListSubject = new BehaviorSubject<DigitLine[]>([]);
  rackListForWorkSpSubject = new BehaviorSubject<RackForWorkSp[]>([]);

  changeLineDigitList(lineDigitList: DigitLine[]) {
    console.log(lineDigitList);
    if (lineDigitList.length > 0) {
      this.lineDigitListSubject.next(lineDigitList);
      this.rackListForWorkSpSubject.next([]);
      let name = 'null';
      let position = '0';
      lineDigitList.forEach(line => {
        if (line.RessourceHardwareRack.BarCode !== undefined) {
          const match = line.RessourceHardwareRack.BarCode.match(this.regex);
          console.log(match);
          name = match[1];
          position = match[2];
        }
        if (
          this.rackListForWorkSpSubject
            .getValue()
            .map(x => x.name)
            .includes(name)
        ) {
          const rackToUpgrade = this.rackListForWorkSpSubject.getValue().splice(
            this.rackListForWorkSpSubject.getValue().findIndex(x => {
              return x.name === name;
            }),
            1
          );
          rackToUpgrade[0].lineList.push({ position: Number(position), line: line });
          const value = [...this.rackListForWorkSpSubject.getValue(), rackToUpgrade[0]];
          this.rackListForWorkSpSubject.next(value);
        } else {
          const rack: RackForWorkSp = {
            name: name,
            lineList: [{ position: Number(position), line: line }]
          };
          const value = [...this.rackListForWorkSpSubject.getValue(), rack];
          this.rackListForWorkSpSubject.next(value);
        }
        console.log(this.rackListForWorkSpSubject.getValue());
      });
      const value = this.rackListForWorkSpSubject.getValue().sort((x, y) => {
        if (x.name > y.name) {
          return 1;
        } else if (x.name < y.name) {
          return -1;
        } else {
          return 0;
        }
      });
      value.forEach(x => {
        x.lineList.sort((x, y) => {
          return x.position - y.position;
        });
      });
      this.rackListForWorkSpSubject.next(value);
    } else {
      this.lineDigitListSubject.next([]);
      this.rackListForWorkSpSubject.next([]);
    }
  }

  workspsSubject = new BehaviorSubject<Workspace[]>([]);

  changeWorksps(worksps: Workspace[]) {
    this.workspsSubject.next(worksps);
    console.log(worksps);
  }

  searchTextValueSubject = new BehaviorSubject<SearchTextValue>(this.searchTextValue);

  changeSearchTextValue(searchTextValue: SearchTextValue) {
    this.searchTextValueSubject.next(searchTextValue);
    console.log(searchTextValue);
  }

  serverDataRessourceHardware = {
    _items: [],
    _meta: {
      page: 1,
      max_results: 20,
      total: 1000
    }
  };

  serverDataRessourceHardwareSubject = new BehaviorSubject<ServerDataRessourceHardware>(
    this.serverDataRessourceHardware
  );

  changeServerDataRessourceHardware(serverDataRessourceHardware: ServerDataRessourceHardware) {
    const filteredItems = serverDataRessourceHardware._items.filter(x => {
      return !/^STANDBY.*/.test(x.BarCode);
    });
    serverDataRessourceHardware._items = filteredItems;
    this.serverDataRessourceHardwareSubject.next(serverDataRessourceHardware);
    console.log(serverDataRessourceHardware);
  }

  resetServerDataRessourceHardware() {
    this.serverDataRessourceHardwareSubject.next(this.serverDataRessourceHardware);
  }

  indexTabSubject = new BehaviorSubject<number>(0);

  changeIndexTab(index: number) {
    this.indexTabSubject.next(index);
    console.log(index);
  }

  elementListSubject = new BehaviorSubject<ElementHardware[]>([]);

  changeElementList(elementList: ElementHardware[]) {
    this.elementListSubject.next(elementList);
    console.log(elementList);
  }

  configLD = {
    ID_RessourceStudio: 0,
    RessourceHardwarePlayer: {
      ID_RessourceHardware: 0,
      Brand: '',
      Model: '',
      SerialNumber: '',
      Price: 0,
      Owner: '',
      Status: '',
      Origin: '',
      Category: '',
      Type: '',
      TechnicalInfo: '',
      Comments: '',
      DateIn: '',
      DateImport: '',
      BarCode: '',
      Configuration: '',
      ModuleCommand: '',
      ModuleSpecific: '',
      RessourceConfigurationRack: [],
      RessourceConfigurationPlayer: [],
      Elements: []
    },
    ID_RessourceHardwareConfiguration: 0,
    Position: 0,
    Installed: false,
    InstalledDate: '',
    RemovedDate: '',
    RessourceHardwareRack: {
      ID_RessourceHardware: 0,
      Brand: '',
      Model: '',
      SerialNumber: '',
      Price: 0,
      Owner: '',
      Status: '',
      Origin: '',
      Category: '',
      Type: '',
      TechnicalInfo: '',
      Comments: '',
      DateIn: '',
      DateImport: '',
      BarCode: '',
      Configuration: '',
      ModuleCommand: '',
      ModuleSpecific: '',
      RessourceConfigurationRack: [],
      RessourceConfigurationPlayer: [],
      Elements: []
    },
    RessourceStudio: {
      ID_RessourceStudio: 0,
      RessourceStudio_Code: '',
      RessourceStudio_Name: '',
      RessourceStudio_Active: false
    },
    Elements: []
  };

  configLDSubject = new BehaviorSubject<DigitLine>(this.configLD);

  changeConfigLD(configLD: DigitLine) {
    this.configLDSubject.next(configLD);
    console.log(configLD);
  }

  ressourceCategorySubject = new BehaviorSubject<RessourceCategory[]>([]);

  changeRessourceCategory(list: RessourceCategory[]) {
    this.ressourceCategorySubject.next(list);
    console.log(list);
  }

  categorySelectedSubject = new BehaviorSubject<RessourceCategory>(null);

  changeRessourCategorySelected(rcs: RessourceCategory) {
    this.categorySelectedSubject.next(rcs);
    console.log(rcs);
  }

  workSpaceStudioListSubject = new BehaviorSubject<Workspace[]>([]);

  changeWorkspaceStudioList(list: Workspace[]) {
    this.workSpaceStudioListSubject.next(list);
    console.log('before changeWorkSpSTUD');
    console.log(list);
  }

  studioSelectedSubject = new BehaviorSubject<string>('');

  changeStudioSelected(studio: string) {
    this.studioSelectedSubject.next(studio);
    console.log(studio);
  }

  resetSearchPlayerSubject = new BehaviorSubject<boolean>(true);

  changeResetSearchPlayer(reset: boolean) {
    this.resetSearchPlayerSubject.next(reset);
  }

  getResetSearchPlayerAsOb() {
    return this.resetSearchPlayerSubject.asObservable();
  }
}
