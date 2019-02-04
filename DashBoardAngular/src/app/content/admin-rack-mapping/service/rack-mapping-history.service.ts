import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalSharingVariableService } from '../../../global-service/global-sharing-variable.service';
import { RackMappingHistory, preRackMappingHistory, ServerData, preServerData } from '../models/rackMappingHistory.model';
import { updateRhIn, createRessourceHardwareIn, updateWorkspaceIn, removeLineDigitIn, addWorkSpIn, removeWorkSpsIn, removeWorkSpIn, updatePositionInRackIn, removeRackIn, savePositionElementsIn, removeEltsAndSavePositionEltsIn, removePlayerIn, changePlayerIn, changeElementIn, createLineAndSavePositionIn } from '../models/payloadIn.model';
import { share } from 'rxjs/operators/share';
import { updateRhOut, createRessourceHardwareOut, updateWorkspaceOut, removeLineDigitOut, addWorkSpOut, removeWorkSpsOut, removeWorkSpOut, updatePositionInRackOut, removeRackOut, savePositionElementsOut, removeEltsAndSavePositionEltsOut, removePlayerOut, changePlayerOut, changeElementOut, createLineAndSavePositionOut } from '../models/payloadOut.model';


  /**
   *
   * Servive used to make call to the back end /
   * Only relative to historic function
   *
   *
   */
@Injectable()
export class RackMappingHistoryService {
  constructor(private http: HttpClient, private globals: GlobalSharingVariableService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getRackMappingHistoryAsOb(pageSize: number, pageIndex: number): Observable<ServerData> {
    const uri =
      this.globals.getURL() +
      'histories?sort=[("ID_RessourceRackMappingHistory", -1)]&max_results=' +
      pageSize +
      '&page=' +
      pageIndex;
    console.log(uri);
    return this.http
      .get<preServerData>(encodeURI(uri))
      .do(res => {
        console.log(res)
        res._items.forEach(x => {
          switch (x.ActionPath) {
            case '/updateRessourceHardware':
              x.PayloadIn = JSON.parse(x.PayloadIn) as updateRhIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as updateRhOut;
              break;
            case '/createRessourceHardware':
              x.PayloadIn = JSON.parse(x.PayloadIn) as createRessourceHardwareIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as createRessourceHardwareOut;
              break;
            case '/updateWorkspace':
              x.PayloadIn = JSON.parse(x.PayloadIn) as updateWorkspaceIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as updateWorkspaceOut;
              break;
            case '/removeLineDigit':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removeLineDigitIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removeLineDigitOut;
              break;
            case '/addWorkSp':
              x.PayloadIn = JSON.parse(x.PayloadIn) as addWorkSpIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as addWorkSpOut;
              break;
            case '/removeWorkSps':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removeWorkSpsIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removeWorkSpsOut;
              break;
            case '/removeWorkSp':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removeWorkSpIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removeWorkSpOut;
              break;
            case '/updatePositionsInRack':
              x.PayloadIn = JSON.parse(x.PayloadIn) as updatePositionInRackIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as updatePositionInRackOut;
              break;
            case '/removeRack':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removeRackIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removeRackOut;
              break;
            case '/savePositionElements':
              x.PayloadIn = JSON.parse(x.PayloadIn) as savePositionElementsIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as savePositionElementsOut;
              break;
            case '/removeEltsAndSavePositionElts':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removeEltsAndSavePositionEltsIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removeEltsAndSavePositionEltsOut;
              break;
            case '/removePlayer':
              x.PayloadIn = JSON.parse(x.PayloadIn) as removePlayerIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as removePlayerOut;
              break;
            case '/changePlayer':
              x.PayloadIn = JSON.parse(x.PayloadIn) as changePlayerIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as changePlayerOut;
              break;
            case '/changeElement':
              x.PayloadIn = JSON.parse(x.PayloadIn) as changeElementIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as changeElementOut;
              break;
            case '/createLineAndSavePosition':
              x.PayloadIn = JSON.parse(x.PayloadIn) as createLineAndSavePositionIn;
              x.PayloadOut = JSON.parse(x.PayloadOut) as createLineAndSavePositionOut;
              break;
            default:
              break;
          }
        });
      })
      .pipe(share()) as Observable<ServerData>;
  }
}
