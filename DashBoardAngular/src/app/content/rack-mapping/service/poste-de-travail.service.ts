import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Workspace } from '../models/workSpace.model';
import { DigitLine } from '../models/digitLine.model';
import { GlobalSharingVariableService } from '../../../global-service/global-sharing-variable.service';
import { Utils } from '../../../util'

interface ServerDataWorkspace {
  _items: Workspace[];
  _meta: meta;
}

class ServerDataLineDigits {
  _items: DigitLine[];
  _meta: meta;
}

interface meta {
  page: number;
  max_results: number;
  total: number;
}
  /**
   *
   * Servive used to make call to the back end /
   * Only relative to the Ressource Studio (poste de travail)
   *
   *
   */
@Injectable()
export class WorkspaceService {
  constructor(private http: HttpClient, private globals: GlobalSharingVariableService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  cleanValueWorkSp(worksp: Workspace){
    return Utils.deepPick(worksp, {
      ID_RessourceStudio: true,
      RessourceStudio_CreationDate: true,
      RessourceStudio_LastModificationDate: true,
      RessourceStudio_Code: true,
      RessourceStudio_Name: true,
      RessourceStudio_Active: true
    });
  }

  getWorkSps(): Observable<ServerDataWorkspace> {
    const uri = this.globals.getURL() + 'workspaces?sort=[("ID_RessourceStudio", 1)]';
    return this.http.get<ServerDataWorkspace>(encodeURI(uri));
  }
  /**
   * retrieve the WorkSps from the back-end according to the RessourceStudioCode aka the name of the Studio / minimal information
   * @param  {} studio name of the studio of the WorkSps
   *
   */
  getWorkSpsWithName(studio): Observable<ServerDataWorkspace> {
    const uri = this.globals.getURL() + 'workspaces?sort=[("ID_RessourceStudio", 1)]&where={"RessourceStudio_Code":"' + studio + '"}';
    return this.http.get<ServerDataWorkspace>(encodeURI(uri));
  }

    /**
   * retrieve the WorkSps from the back-end according to the RessourceStudioCode aka the name of the Studio / all information : full line digit embedded
   * @param  {} studio name of the studio of the WorkSps
   *
   */
  getWorkSpsWithNameFull(studio): Observable<ServerDataWorkspace> {
    const uri = this.globals.getURL() + 'workspaces?sort=[("ID_RessourceStudio", 1)]&where={"RessourceStudio_Code":"' + studio + '"}&embedded={"lineDigits":1,"lineDigits.RessourceHardwareRack":1,"lineDigits.RessourceHardwarePlayer":1}'
    return this.http.get<ServerDataWorkspace>(encodeURI(uri));
  }

  getWorkSpWithName(worksp): Observable<Workspace> {
    const uri = this.globals.getURL() + 'workspaces?sort=[("ID_RessourceStudio", 1)]&where={"RessourceStudio_Name":"' + worksp + '"}&embedded={"lineDigits":1,"lineDigits.RessourceHardwareRack":1,"lineDigits.RessourceHardwarePlayer":1}';
    return this.http.get<ServerDataWorkspace>(encodeURI(uri)).map(result => result._items[0]);
  }

  updateWorkspace(workSpace: Workspace): Observable<Workspace> {
    const uri = this.globals.getURL() + 'workspaces/'+workSpace.ID_RessourceStudio;
    const cleanValue = this.cleanValueWorkSp(workSpace)
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.put<Workspace>(encodeURI(uri), body, this.httpOptions);
  }

  addWorkSp(data) {
    const uri = this.globals.getURL() + 'workspaces';
    const cleanValue = this.cleanValueWorkSp(data)
    const body = JSON.stringify(cleanValue);
    console.log(body);
    return this.http.post<Workspace>(encodeURI(uri), body, this.httpOptions);
  }

  removeWorkSps(listID: number[]) {
    let uri = this.globals.getURL() + 'workspaces/'
    listID.forEach(x => {
      uri += x+','
    })
    uri = uri.substr(0, uri.length - 1);
    return this.http.delete<any>(encodeURI(uri), this.httpOptions);
  }

  removeWorkSp(ID_RessourceStudio: number) {
    const uri = this.globals.getURL() + 'workspaces/'+ID_RessourceStudio;
    return this.http.delete<any>(encodeURI(uri), this.httpOptions).map(result => result[0]);
  }

}
