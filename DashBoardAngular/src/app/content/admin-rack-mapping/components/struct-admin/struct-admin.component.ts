import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RackMappingHistoryComponent } from '../rack-mapping-history/rack-mapping-history.component'
import { RackMappingHistory, ServerData } from '../../models/rackMappingHistory.model';
import { RackMappingHistoryService } from '../../service/rack-mapping-history.service';
import { Observable } from 'rxjs/Observable';
  /**
   *
   * Head of the DOM for Admin Rack Mapping Page
   *
   *
   */
@Component({
  selector: 'app-struct-admin',
  templateUrl: './struct-admin.component.html',
  styleUrls: ['./struct-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StructAdminComponent implements OnInit {
  listHistory: Observable<ServerData> = new Observable()

  constructor(private rackMappingHistoryService: RackMappingHistoryService) { }

  ngOnInit() {
    this.listHistory = this.rackMappingHistoryService.getRackMappingHistoryAsOb(30,1)
  }

  getHistory(event){
    this.listHistory = this.rackMappingHistoryService.getRackMappingHistoryAsOb(30,event.pageIndex+1)
  }

}
