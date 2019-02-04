import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RessourceHardwareDetail } from '../models/ressourceHardwareDetail.model';
import { RessourceHardware } from '../models/ressourceHardware.model';
import { ServerDataRessourceHardware } from '../models/ServerDataRessourceHardware.model';
import { DigitLine } from '../models/digitLine.model';
import { RessourceCategory } from '../models/ressourceCategory.model';
import { GlobalSharingVariableService } from '../../../global-service/global-sharing-variable.service';
import { Utils } from '../../../util';

interface meta {
  page: number;
  max_results: number;
  total: number;
}

interface elements {
  _items: element[];
  _meta: meta;
}

interface element {
  RessourceHardwareConfiguration: number;
}

interface ServerDataHardwareDetail {
  _items: RessourceHardwareDetail[];
  _meta: meta;
}

interface ServerDataHardwareGoto {
  _items: DigitLine[];
  _meta: meta;
}

interface ServerDataRessourceCategory {
  _items: RessourceCategory[];
  _meta: meta;
}
  /**
   *
   * Service used to make call to the back end /
   * Only relative to the Ressource Hardware
   *
   *
   */
@Injectable()

export class RessourceHardwareService {
  constructor(private http: HttpClient, private globals: GlobalSharingVariableService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  cleanValueRh(rh: RessourceHardwareDetail){
    return Utils.deepPick(rh, {
      ID_RessourceHardware: true,
      Brand: true,
      Model: true,
      SerialNumber: true,
      DateIn: true,
      Price: true,
      Owner: true,
      Status: true,
      Origin: true,
      Category: true,
      Type: true,
      TechnicalInfo: true,
      Comments: true,
      DateImport: true,
      BarCode: true,
      Configuration: true,
      ModuleCommand: true,
      ModuleSpecific: true
    });
  }

  getRessourceHardware(
    pageSize,
    pageIndex,
    BrandS,
    CategoryS,
    BarCodeS,
    TypeS,
    SerialNumberS,
    ModelS
  ): Observable<ServerDataRessourceHardware> {
    let counterR = 0;
    let uri: string =
      this.globals.getURL() +
      'hardwares?projection={"ID_RessourceHardware": 1, "Category": 1, "BarCode": 1}&sort=[("ID_RessourceHardware", -1)]&max_results=' +
      pageSize +
      '&page=' +
      pageIndex +
      '&where={';

    if (BrandS !== '') {
      uri += '"Brand":"like(\\"%' + BrandS + '%\\")",';
      counterR += 1;
    }

    if (CategoryS !== '') {
      uri += '"Category":"like(\\"%' + CategoryS + '%\\")",';
      counterR += 1;
    }

    if (BarCodeS !== '') {
      uri += '"BarCode":"like(\\"%' + BarCodeS + '%\\")",';
      counterR += 1;
    }

    if (TypeS !== '') {
      uri += '"Type":"like(\\"%' + TypeS + '%\\")",';
      counterR += 1;
    }

    if (SerialNumberS !== '') {
      uri += '"SerialNumber":"like(\\"%' + SerialNumberS + '%\\")",';
      counterR += 1;
    }

    if (ModelS !== '') {
      uri += '"Model":"like(\\"%' + ModelS + '%\\")",';
      counterR += 1;
    }

    if (counterR > 0) {
      uri = uri.substr(0, uri.length - 1);
    }

    uri += '}';

    console.log(uri);

    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getRessourceHardwareDetail(ID_RessourceHardware): Observable<ServerDataHardwareDetail> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"ID_RessourceHardware":"' +
      ID_RessourceHardware +
      '"}&sort=[("ID_RessourceHardware", 1)]';
    return this.http.get<ServerDataHardwareDetail>(encodeURI(uri));
  }

  getRessourceHardwareGoto(ID_RessourceHardware, category): Observable<ServerDataHardwareGoto> {
    if (category.toUpperCase() == 'RACK') {
      const uri =
        this.globals.getURL() +
        'digitlines?embedded={"Elements":1,"RessourceStudio":1,"RessourceHardwareRack":1,"RessourceHardwarePlayer":1}&where={"ID_RessourceHardwareRack":' +
        ID_RessourceHardware +
        '}';
      return this.http.get<ServerDataHardwareGoto>(encodeURI(uri));
    } else if (category.toUpperCase() == 'PLAYER') {
      const uri =
        this.globals.getURL() +
        'digitlines?embedded={"Elements":1,"RessourceStudio":1,"RessourceHardwareRack":1,"RessourceHardwarePlayer":1}&where={"ID_RessourceHardwarePlayer":' +
        ID_RessourceHardware +
        '}';
      return this.http.get<ServerDataHardwareGoto>(encodeURI(uri));
    } else {
      const uri = this.globals.getURL() + 'elements?where={"ID_RessourceHardware":' + ID_RessourceHardware + '}';
      return this.http
        .get<elements>(encodeURI(uri))
        .map(res => {
          return res._items.map(res => {
            return res.RessourceHardwareConfiguration;
          });
        })
        .flatMap(RessourceHardwareConfigurations => {
          if (RessourceHardwareConfigurations.length > 0) {
            let uri2 =
              this.globals.getURL() +
              'digitlines?embedded={"Elements":1,"RessourceStudio":1,"RessourceHardwareRack":1,"RessourceHardwarePlayer":1}&where={"or_":[';
            RessourceHardwareConfigurations.forEach(elt => {
              uri2 += '{"ID_RessourceHardwareConfiguration":' + elt + '},';
            });
            uri2 = uri2.substr(0, uri2.length - 1);
            uri2 += ']}';
            return this.http.get<ServerDataHardwareGoto>(encodeURI(uri2));
          }
          console.log('nothing to retrieve from database for GO TO');
          return Observable.empty<ServerDataHardwareGoto>();
        });
    }
  }

  getRessourceHardwareForAddRH(barcodeS: string, category: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barcodeS +
      '%\\")","Category":"like(\\"%' +
      category +
      '%\\")"}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getRackInRackMapping(): Observable<ServerDataRessourceHardware> {
    const uri = this.globals.getURL() + 'hardwares?projection={"BarCode":1}&where={"RessourceConfigurationRack": "!= null"}&embedded={"RessourceConfigurationRack":1}&max_results=1000'
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getRackForAddLine(barcodeS: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barcodeS +
      '%\\")","Category": "RACK"}&embedded={"RessourceConfigurationPlayer":1, "RessourceConfigurationRack":1, "RessourceConfigurationRack.RessourceStudio":1}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getPlayerNotInUse(barCode: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barCode +
      '%\\")","Category": "Player","RessourceConfigurationPlayer":"==null"}&embedded={"RessourceConfigurationPlayer":1}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getPlayerInUse(barCode: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barCode +
      '%\\")","Category": "Player","RessourceConfigurationPlayer":"!=null"}&embedded={"RessourceConfigurationPlayer":1}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getRhNotInUse(barCode: string, category: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barCode +
      '%\\")","Category": "' +
      category +
      '","Elements":"==null"}&embedded={"Elements":1}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  getRhInUse(barCode: string, category: string): Observable<ServerDataRessourceHardware> {
    const uri =
      this.globals.getURL() +
      'hardwares?where={"BarCode":"like(\\"%' +
      barCode +
      '%\\")","Category": "' +
      category +
      '","Elements":"!=null"}&embedded={"Elements":1}&max_results=50';
    return this.http.get<ServerDataRessourceHardware>(encodeURI(uri));
  }

  updateRessourceHardware(ressourceHardwareDetail: RessourceHardwareDetail): Observable<any> {
    const uri = this.globals.getURL() + 'hardwares/'+ressourceHardwareDetail.ID_RessourceHardware;
    console.log(ressourceHardwareDetail);
    const cleanValue = this.cleanValueRh(ressourceHardwareDetail)
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.put<any>(encodeURI(uri), body, this.httpOptions);
  }

  createRessourceHardware(ressourceHardwareDetail: RessourceHardwareDetail): Observable<any> {
    const uri = this.globals.getURL() + 'hardwares';
    const cleanValue = this.cleanValueRh(ressourceHardwareDetail)
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.post<any>(encodeURI(uri), body, this.httpOptions);
  }

  getRessourceCategory(): Observable<ServerDataRessourceCategory> {
    const uri = this.globals.getURL() + 'categories?sort=[("Category", 1)]';
    return this.http.get<ServerDataRessourceCategory>(encodeURI(uri));
  }
}

