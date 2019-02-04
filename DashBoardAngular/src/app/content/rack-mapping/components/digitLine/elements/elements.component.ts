import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { ElementHardware } from '../../../models/elementHardware.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { ServerDataRessourceHardware } from '../../../models/ServerDataRessourceHardware.model';
import { SearchTextValue } from '../../../models/searchTextValue.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LineDigitService } from '../../../service/line-digit.service';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { FormControl } from '@angular/forms';
import { RessourceCategory } from '../../../models/ressourceCategory.model';
import { Utils } from '../../../../../util';
import { DialogComponent } from '../../dialog/dialog.component';
import { removedEltInterface } from '../../../models/multipleInterface.model';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  ID_RessourceHardwareConfiguration: number;
  elementListSubject: BehaviorSubject<ElementHardware[]>;
  elementList: ElementHardware[];

  @Input()
  set elements(elementList: ElementHardware[]) {
    this.elementList = elementList;
  }

  @Input()
  set IdRessourceHardwareConf(ID_RessourceHardwareConfiguration: number) {
    this.ID_RessourceHardwareConfiguration = ID_RessourceHardwareConfiguration;
  }

  @Output('openDialogChange') openDialogChange: EventEmitter<object> = new EventEmitter<object>();

  constructor(private sharingVariableService: SharingVariableService, private lineDigitService: LineDigitService) {}

  ngOnInit() {}

  openChange(Rh: RessourceHardware) {
    this.openDialogChange.emit({ type: Rh.Category, OLD_ID_RessourceHardware: Rh.ID_RessourceHardware });
  }

  gotoRHElt(item) {
    const val = '';
    const value = {
      ...this.sharingVariableService.searchTextValue,
      BarCodeS: item.RessourceHardware.BarCode,
      CategoryS: val
    };
    this.sharingVariableService.changeSearchTextValue(value);
    this.sharingVariableService.changeRessourCategorySelected(null);
    this.sharingVariableService.changeIndexTab(3);
  }

  updateElementList(listElt) {
    listElt.forEach(elt => {
      const elementToUpdate = this.elementList.find(x => {
        return x.RessourceHardware.ID_RessourceHardware === elt.ID_RessourceHardware;
      })
      console.log(elementToUpdate)
      console.log(elt.ID_RessourceHardwareConfigurationElement)
      elementToUpdate.ID_RessourceHardwareConfigurationElement =
        elt.ID_RessourceHardwareConfigurationElement;
    });
  }

  onRemove(i) {
    const removedElt = this.elementList.splice(i, 1);
    const value: removedEltInterface = {
      ID_RessourceHardwareConfiguration: this.ID_RessourceHardwareConfiguration,
      removedElt: removedElt,
      elementList: this.elementList
    };
    this.lineDigitService.removeEltsAndSavePositionElts(value).subscribe(serverData => {
      console.log(serverData);
      this.updateElementList(serverData.listElt);
      this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
    });
  }

  onKeyPosition(i, event) {
    console.log('inside onKey');
    const removedElt = this.elementList.splice(i, 1);
    this.elementList.splice(event, 0, removedElt[0]);
  }

  openSaveList() {
    const elementsListString: string[] = this.elementList.map(x => '  ' + x.RessourceHardware.BarCode);
    const dialogRef = this.sharingVariableService.getDialog().open(DialogComponent, {
      width: '250px',
      data: {
        source: this.elementList,
        type: 'Elements',
        info: elementsListString,
        action: 'update'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.elementList.forEach((elt, i) => {
          elt.Position = i + 1;
        });
        console.log(this.elementList);
        const value = {
          ID_RessourceHardwareConfiguration : this.ID_RessourceHardwareConfiguration,
          elementList: this.elementList
        }
        this.lineDigitService.savePositionElements(value).subscribe(serverData => {
          console.log(serverData);
          this.updateElementList(serverData.listElt);
          this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
        });
      } else {
        console.log('The saveDialog was closed without saving');
      }
    });
  }
  // call popup

  onAdd(index): void {
    console.log('inside openDialog');
    const dialogRef = this.sharingVariableService.getDialog().open(DialogAdd, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(RessourceHardwareSelected => {
      if (RessourceHardwareSelected !== undefined) {
        const element: ElementHardware = {
          ID_RessourceHardwareConfigurationElement: -1,
          RessourceHardware: RessourceHardwareSelected,
          RessourceHardwareConfiguration: this.sharingVariableService.configLDSubject.getValue()
            .ID_RessourceHardwareConfiguration,
            Position: index
        };
        this.elementList.splice(index, 0, element);
        console.log(this.elementList);
        const value = {
          ID_RessourceHardwareConfiguration : this.ID_RessourceHardwareConfiguration,
          elementList: this.elementList
        }
        this.lineDigitService.savePositionElements(value).subscribe(serverData => {
          console.log(serverData);
          this.updateElementList(serverData.listElt);
          this.sharingVariableService.changeInfoSnackBar(serverData.BarCode + ' saved correctly !');
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
  selector: 'dialogAdd',
  templateUrl: 'dialogAdd.html'
})
export class DialogAdd {
  barCodeSubject = new BehaviorSubject<string>('');
  barCodeS: string;
  rhList: RessourceHardware[];
  categoryS = '';
  categoryList: RessourceCategory[];
  selectedRH: RessourceHardware;
  disableBarCode = true;

  constructor(
    private sharingVariableService: SharingVariableService,
    private ressourceHardwareService: RessourceHardwareService,
    public dialogRef: MatDialogRef<DialogAdd>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sharingVariableService.ressourceCategorySubject.subscribe(res => {
      console.log(res);
      this.categoryList = Utils.multiRemove(res, { Category: ['RACK', 'Player'] }) as RessourceCategory[];
    });
    this.barCodeSubject.debounceTime(500).subscribe(barCode => {
      this.barCodeS = barCode;
      this.ressourceHardwareService
        .getRessourceHardwareForAddRH(this.barCodeS, this.categoryS)
        .subscribe(ServerData => {
          this.rhList = ServerData._items;
          console.log(this.rhList);
          this.selectedRH = this.rhList.find(x => x.BarCode === this.barCodeS);
        });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close(this.selectedRH);
  }

  onKeyBarCode(BarCode: string) {
    this.barCodeSubject.next(BarCode);
  }

  catSelected(Category) {
    console.log(Category);
    if (Category.value !== undefined || Category.value === 'None') {
      this.disableBarCode = false;
      this.categoryS = Category.value.Category;
    } else {
      this.disableBarCode = true;
      this.categoryS = '';
    }
    this.ressourceHardwareService.getRessourceHardwareForAddRH(this.barCodeS, this.categoryS).subscribe(ServerData => {
      this.rhList = ServerData._items;
      console.log(this.rhList);
      this.selectedRH = this.rhList.find(x => x.BarCode === this.barCodeS);
    });
  }
  selectRH(event) {
    this.selectedRH = this.rhList.find(x => x.BarCode === event.option.value);
  }
}
