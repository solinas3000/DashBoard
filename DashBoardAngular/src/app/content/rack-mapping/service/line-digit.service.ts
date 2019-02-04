import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ElementHardware } from '../models/elementHardware.model';
import { RackForWorkSp } from '../models/rackForWorkSp.model';
import { DigitLine } from '../models/digitLine.model';
import { GlobalSharingVariableService } from '../../../global-service/global-sharing-variable.service';
import { Utils } from '../../../util';
import { removedEltInterface, saveEltInterface } from '../models/multipleInterface.model';
import { SubStandbyPipe } from '../pipes/sub-standby.pipe';
interface meta {
  page: number;
  max_results: number;
  total: number;
}

interface ServerElementHardware {
  _items: ElementHardware[];
  _meta: meta;
}

interface ServerDataLineDigits {
  _items: DigitLine[];
  _meta: meta;
}
/**
 *
 * Service used to make call to the back end /
 * Only relative to the Ressource Configuration and Elements
 *
 *
 */
@Injectable()
export class LineDigitService {
  constructor(
    private http: HttpClient,
    private globals: GlobalSharingVariableService,
    private subStandbyPipe: SubStandbyPipe
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  cleanValueLine(line: DigitLine) {
    return Utils.deepPick(line, {
      ID_RessourceHardwareConfiguration: true,
      Position: true,
      Installed: true,
      InstalledDate: true,
      RemovedDate: true,
      ID_RessourceStudio: true
    });
  }

  getElements(id_configuration: number): Observable<ServerElementHardware> {
    const uri =
      this.globals.getURL() +
      'elements?embedded={"RessourceHardware":1}&sort=[("Position", 1)]&where={"RessourceHardwareConfiguration": ' +
      id_configuration +
      '}';
    console.log(uri);
    return this.http.get<ServerElementHardware>(encodeURI(uri));
  }

  savePositionElements(value: saveEltInterface) {
    const uri = this.globals.getURL() + 'digitlines/' + value.ID_RessourceHardwareConfiguration + '/elements/';
    const schema = {
      elementList: [
        {
          ID_RessourceHardwareConfigurationElement: true,
          RessourceHardwareConfiguration: true,
          Position: true,
          RessourceHardware: {
            ID_RessourceHardware: true
          }
        }
      ]
    };
    const cleanValue = Utils.deepPick(value, schema);
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.put<any>(encodeURI(uri), body, this.httpOptions);
  }

  removeEltsAndSavePositionElts(value: removedEltInterface) {
    let uri = this.globals.getURL() + 'elements/';
    value.removedElt.forEach(x => {
      uri += x.ID_RessourceHardwareConfigurationElement + ',';
    });
    uri = uri.substr(0, uri.length - 1);
    return this.http.delete<any>(encodeURI(uri), this.httpOptions).map(result => result[0]);
  }

  loadLineDigits(lineDigits: number[]): Observable<ServerDataLineDigits> {
    if (lineDigits.length > 0) {
      let uri =
        this.globals.getURL() +
        'digitlines?embedded={"Elements":1,"Elements.RessourceHardware":1,"RessourceHardwareRack":1,"RessourceStudio":1,"RessourceHardwarePlayer":1,"RessourceHardwarePlayer.RessourceConfigurationPlayer":1}&sort=[("Position", 1)]&where={"or_":[';
      lineDigits.forEach(line => {
        uri += '{"ID_RessourceHardwareConfiguration":' + line + '},';
      });
      uri = uri.substr(0, uri.length - 1);
      uri += ']}';
      console.log(uri);
      return this.http.get<ServerDataLineDigits>(encodeURI(uri));
    } else {
      return Observable.of(undefined) as Observable<ServerDataLineDigits>;
    }
  }

  loadLineDigitsInStandBy(): Observable<ServerDataLineDigits> {
    const uri =
      this.globals.getURL() +
      'digitlines?embedded={"Elements":1,"Elements.RessourceHardware":1,"RessourceHardwareRack":1,"RessourceHardwareRack.RessourceConfigurationRack":1,"RessourceHardwarePlayer":1,"RessourceHardwarePlayer.RessourceConfigurationPlayer":1}&where={"Installed":0}';
    return this.http.get<ServerDataLineDigits>(encodeURI(uri));
  }

  updateLineDigit(line: DigitLine): Observable<any> {
    const uri = this.globals.getURL() + 'digitlines/' + line.ID_RessourceHardwareConfiguration;
    const cleanValue = this.cleanValueLine(line);
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.put<any>(encodeURI(uri), body, this.httpOptions).map(result => result[0]);
  }

  removeLineDigit(line: DigitLine): Observable<any> {
    const uri = this.globals.getURL() + 'digitlines/' + line.ID_RessourceHardwareConfiguration;
    return this.http.delete<any>(encodeURI(uri), this.httpOptions);
  }

  removeRack(rack: RackForWorkSp): Observable<any> {
    let uri = this.globals.getURL() + 'digitlines/';
    rack.lineList.forEach(x => {
      uri += x.line.ID_RessourceHardwareConfiguration + ',';
    });
    uri = uri.substr(0, uri.length - 1);
    return this.http
      .delete<any>(encodeURI(uri), this.httpOptions)
      .map(x => this.subStandbyPipe.transform(x.BarCode).replace(/[\x2d| ]\d{1,3}$/, ''));
  }

  createLineAndSavePosition(data): Observable<any> {
    const idStudio = data.lineToAdd[0].line.ID_RessourceStudio;
    const nameRack = data.racksPosition[0].nameRack.replace(/[\x2d| ]\d{1,3}$/, '');
    const uri = this.globals.getURL() + 'workspaces/'+idStudio+'/racks/'+nameRack+'/digitlines'
    const schema = {
      lineToAdd: [
        {
          type: true,
          line: {
            Position: true,
            ID_RessourceHardwareConfiguration: true,
            Old_ID_RessourceHardwareConfiguration_Rack: true,
            Old_ID_RessourceHardwareConfiguration_Player: true,
            ID_RessourceHardwarePlayer: true,
            ID_RessourceStudio: true,
            InstalledDate: true,
            RessourceHardwareConfiguration: true,
            RessourceHardwareRack: {
              ID_RessourceHardware: true,
              BarCode: true
            }
          }
        }
      ],
      racksPosition: [
        {
          ID_line: true,
          position: true,
          ID_rack: true,
          nameRack: true
        }
      ]
    };
    const cleanValue = Utils.deepPick(data, schema);
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.post<any>(encodeURI(uri), body, this.httpOptions);
  }

  updatePositionsInRack(rack: any): Observable<any> {
    const uri = this.globals.getURL() + 'workspaces/'+rack.ID_RessourceStudio+'/racks/'+rack.name+'/digitlines';
    const schema = {
      list: [
        {
          ID_line: true,
          position: true,
          ID_rack: true,
          nameRack: true
        }
      ]
    };
    const cleanValue = Utils.deepPick(rack, schema);
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.put<any>(encodeURI(uri), body, this.httpOptions);
  }

  removePlayer(data: any): Observable<any> {
    const uri = this.globals.getURL() + 'digitlines/' + data + '/player';
    return this.http.delete<any>(encodeURI(uri), this.httpOptions);
  }

  changePlayer(data: any): Observable<any> {
    const uri =
      this.globals.getURL() +
      'digitlines/' +
      data.RessourceHardwareConfiguration.ID_RessourceHardwareConfiguration +
      '/player/' +
      data.newPlayer.ID_RessourceHardware;
    return this.http.put<any>(encodeURI(uri), this.httpOptions);
  }

  changeElement(data: any): Observable<any> {
    const uri =
      this.globals.getURL() +
      'elements/' +
      data.RessourceHardwareConfigurationElement.ID_RessourceHardwareConfigurationElement +
      '/hardware/' +
      data.newRh.ID_RessourceHardware;
    return this.http.put<any>(encodeURI(uri), this.httpOptions);
  }
}
