import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { RackMappingHistory, ServerData } from '../../models/rackMappingHistory.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { Utils } from '../../../../util';
import { RowPlaceholder } from '@angular/cdk/table';
import { DataSourcePipe } from '../../../../pipes/data-source.pipe'
  /**
   *
   * Historic Component / Take List of action as input and format the data
   *
   *
   */
@Component({
  selector: 'app-rack-mapping-history',
  templateUrl: './rack-mapping-history.component.html',
  styleUrls: ['./rack-mapping-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RackMappingHistoryComponent implements OnInit {
  displayedColumns = ['Agent', 'Action', 'Date'];
  data: RackMappingHistory[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  length: number;
  pageIndex: number;
  pageSize: number;
  selectedRow: RackMappingHistory;

  @Input()
  set list(list: ServerData) {
    if(list != null){
      this.data = list._items;
      console.log(this.data);
      this.length = list._meta.total;
      this.pageIndex = list._meta.page;
      this.pageSize = list._meta.max_results
    }
  }

  @Output('getHistory') getHistory: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {}

  getHistoryViaPaginator(event) {
    this.getHistory.emit(event);
  }

  selectRow(row) {
    this.selectedRow = row;
    console.log(row);
  }
}
