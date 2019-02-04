import { Component, OnInit, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RessourceHardwareService } from '../../../service/ressource-hardware.service';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { WorkspaceService } from '../../../service/poste-de-travail.service';
import { DigitLine } from '../../../models/digitLine.model';
import { LineDigitService } from '../../../service/line-digit.service';
import { Workspace } from '../../../models/workSpace.model';
import { Utils } from '../../../../../util';
import { RessourceHardware } from '../../../models/ressourceHardware.model';

interface ResourceStudio {
  RessourceStudio_Name: string;
  RessourceStudio_Code: string;
  ID_RessourceStudio: number;
}
  /**
   *
   * Part Two for the content of the selected hardware in the list / Show GO TO button
   *
   */
@Component({
  selector: 'app-ressource-hardware-goto',
  templateUrl: './ressource-hardware-goto.component.html',
  styleUrls: ['./ressource-hardware-goto.component.css']
})
export class RessourceHardwareGotoComponent implements OnInit {
  ID_RessourceHardware: Number = 0;
  categoryH = '';
  ressourceHardwareGotos: DigitLine[];
  ressourceStudioList: ResourceStudio[];
  ressourceWorkSp: ResourceStudio[];
  worksps: Workspace[];
  inRM = true;

  ngOnInit() {
    this.sharingVariableService.workspsSubject.subscribe(worksps => {
      this.worksps = worksps;
    });
  }

  @Input()
  set RessourceHardware(ressourceHardware: RessourceHardware) {
    this.ID_RessourceHardware = ressourceHardware.ID_RessourceHardware;
    this.categoryH = ressourceHardware.Category;
    this.getRessourceHardwareGoto(this.ID_RessourceHardware, this.categoryH);
  }

  constructor(
    private ressourceHardwareService: RessourceHardwareService,
    private sharingVariableService: SharingVariableService,
    private workSpaceService: WorkspaceService,
    private lineDigitService: LineDigitService
  ) {}

  getRessourceHardwareGoto(ID_RessourceHardware, categoryH): void {
    this.ressourceHardwareService.getRessourceHardwareGoto(ID_RessourceHardware, categoryH).subscribe(ServerData => {
      console.log(ServerData);
      this.ressourceHardwareGotos = ServerData._items.filter(x => x.RessourceStudio.RessourceStudio_Name != 'STANDBY');
      console.log(this.ressourceHardwareGotos);
      this.ressourceWorkSp = this.ressourceHardwareGotos
        .map(elt => elt.RessourceStudio)
        .filter(Utils.uniqFilterAccordingToProp('ID_RessourceStudio'))
        .filter(x => x.RessourceStudio_Name != 'STANDBY');
      this.ressourceStudioList = this.ressourceHardwareGotos
        .map(elt => elt.RessourceStudio)
        .filter(Utils.uniqFilterAccordingToProp('RessourceStudio_Code'))
        .filter(x => x.RessourceStudio_Code != 'STANDBY');
      this.inRM = this.ressourceHardwareGotos.length > 0 ? true : false;
      return;
    });
    this.inRM = false;
  }

  gotoStudio(item) {
    console.log(item);
    this.sharingVariableService.changeStudioSelected(item.RessourceStudio_Code);
    this.workSpaceService.getWorkSpsWithName(item.RessourceStudio_Code).subscribe(serverData => {
      this.sharingVariableService.changeWorkspaceStudioList(serverData._items);
    });
    this.sharingVariableService.changeIndexTab(0);
  }

  gotoWorkSp(item) {
    console.log(item);
    this.lineDigitService.loadLineDigits(item.lineDigits).subscribe(serverData => {
      this.sharingVariableService.changeWorkspaceSelected(
        this.worksps.find(x => x.ID_RessourceStudio === item.ID_RessourceStudio)
      );
      this.sharingVariableService.changeLineDigitList(serverData._items);
    });
    this.sharingVariableService.changeIndexTab(1);
  }

  gotoLineDigit(item) {
    console.log(item);
    this.lineDigitService.getElements(item.ID_RessourceHardwareConfiguration).subscribe(serverData => {
      this.sharingVariableService.changeElementList(serverData._items);
      this.sharingVariableService.changeConfigLD(item);
      this.sharingVariableService.changeResetSearchPlayer(true);
    });
    this.sharingVariableService.changeIndexTab(2);
  }
}
