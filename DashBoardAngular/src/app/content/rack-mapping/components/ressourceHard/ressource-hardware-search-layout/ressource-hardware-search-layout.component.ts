import { Component, OnInit, ViewChild } from '@angular/core';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
import { RessourceHardwareDetailComponent } from '../ressource-hardware-detail/ressource-hardware-detail.component';
import { SearchTextValue } from '../../../models/searchTextValue.model';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { ServerDataRessourceHardware } from '../../../models/ServerDataRessourceHardware.model';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { RessourceCategory } from '../../../models/ressourceCategory.model';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

  /**
   *
   * Head of the DOM Tree for Ressource Hardware Tab
   *
   */
@Component({
  selector: 'app-ressource-hardware-search-layout',
  templateUrl: './ressource-hardware-search-layout.component.html',
  styleUrls: ['./ressource-hardware-search-layout.component.css']
})
export class RessourceHardwareSearchLayoutComponent {
  selectedRow: any;
  serverDataRessourceHardware: ServerDataRessourceHardware;
  categoryList: RessourceCategory[];
  categorySelected: RessourceCategory;
  displayedColumns = ['BarCode', 'Category'];
  searchTextValue: SearchTextValue = {
    BrandS: '',
    BarCodeS: '',
    CategoryS: '',
    ModelS: '',
    SerialNumberS: '',
    TypeS: ''
  };
  constructor(
    private ressourceHardwareService: RessourceHardwareService,
    private sharingVariableService: SharingVariableService
  ) {}

  @ViewChild('hardwareDetail') hardwareDetail;
  @ViewChild('hardwareGoto') hardwareGoto;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  setPage(index: number) {
    this.paginator.pageIndex = index;
  }

  ngOnInit() {
    this.ressourceHardwareService.getRessourceCategory().subscribe(serverData => {
      this.sharingVariableService.changeRessourceCategory(serverData._items);
    });
    this.sharingVariableService.ressourceCategorySubject.subscribe(list => {
      this.categoryList = list;
    });
    this.sharingVariableService.categorySelectedSubject.subscribe(categorySelected => {
      this.categorySelected = categorySelected;
    });
    this.sharingVariableService.serverDataRessourceHardwareSubject.subscribe(serverData => {
      this.serverDataRessourceHardware = serverData;
      if(this.serverDataRessourceHardware._items.length === 0){
        this.selectedRow = undefined
      }
    });
    this.sharingVariableService.searchTextValueSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(searchTextValue => {
        this.searchTextValue = searchTextValue;
        console.log(Object.values(this.searchTextValue));
        if (
          Object.values(this.searchTextValue).some(element => {
            return element !== '';
          })
        ) {
          this.getRessourceHardware(this.serverDataRessourceHardware._meta.max_results, this.searchTextValue);
        } else {
          this.sharingVariableService.resetServerDataRessourceHardware();
        }
      });
  }

  getRessourceHardware(pageSize, searchTextValue): void {
    console.log(searchTextValue);
    this.ressourceHardwareService
      .getRessourceHardware(
        pageSize,
        1,
        searchTextValue.BrandS,
        searchTextValue.CategoryS,
        searchTextValue.BarCodeS,
        searchTextValue.TypeS,
        searchTextValue.SerialNumberS,
        searchTextValue.ModelS
      )
      .subscribe(ServerData => {
        console.log(ServerData);
        this.sharingVariableService.changeServerDataRessourceHardware(ServerData);
      });
  }

  getRessourceHardwareViaPaginator(pageEvent) {
    console.log(pageEvent);
    console.log(this.searchTextValue);
    this.ressourceHardwareService
      .getRessourceHardware(
        pageEvent.pageSize,
        pageEvent.pageIndex + 1,
        this.searchTextValue.BrandS,
        this.searchTextValue.CategoryS,
        this.searchTextValue.BarCodeS,
        this.searchTextValue.TypeS,
        this.searchTextValue.SerialNumberS,
        this.searchTextValue.ModelS
      )
      .subscribe(ServerData => {
        console.log(ServerData);
        this.sharingVariableService.changeServerDataRessourceHardware(ServerData);
      });
  }

  onKeyBarCode(BarCode: any) {
    const value = { ...this.searchTextValue, BarCodeS: BarCode };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  onKeyModel(Model: any) {
    const value = { ...this.searchTextValue, ModelS: Model };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  onKeyBrand(Brand: any) {
    const value = { ...this.searchTextValue, BrandS: Brand };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  catSelected(Category) {
    let val = '';
    if (Category.value !== undefined) {
      val = Category.value.Category;
    }
    const value = { ...this.searchTextValue, CategoryS: val };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  onKeyType(Type: any) {
    const value = { ...this.searchTextValue, TypeS: Type };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  onKeySerialNumber(SerialNumber: any) {
    const value = { ...this.searchTextValue, SerialNumberS: SerialNumber };
    this.sharingVariableService.changeSearchTextValue(value);
  }

  // when search button clean is fired

  onClose() {
    console.log("inside on close")
    this.searchTextValue = {
      BrandS: '',
      BarCodeS: '',
      CategoryS: '',
      ModelS: '',
      SerialNumberS: '',
      TypeS: ''
    }
    this.sharingVariableService.resetServerDataRessourceHardware();
  }

  selectRow(row) {
    this.selectedRow = row;
    console.log(row);
  }

}
