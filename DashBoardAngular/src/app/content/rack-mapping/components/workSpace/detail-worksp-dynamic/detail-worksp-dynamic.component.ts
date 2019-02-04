import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../../../models/workSpace.model';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail-worksp-dynamic',
  templateUrl: './detail-worksp-dynamic.component.html',
  styleUrls: ['./detail-worksp-dynamic.component.css']
})
  /**
   *Definition of the component loaded dynamically in the rigth side nav bar
   See component factory service in global Service directory and openSideNav() line 155 in StructWorkspaceComponent for a example
   */
export class DetailWorkspDynamicComponent implements OnInit {
  data: any

  constructor() { }

  ngOnInit() {

  }

}
