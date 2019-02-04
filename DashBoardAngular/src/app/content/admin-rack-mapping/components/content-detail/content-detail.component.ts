import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RackMappingHistory } from '../../models/rackMappingHistory.model';
  /**
   *
   * Content for one element of the historic list
   *
   *
   */
@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDetailComponent implements OnInit {
  element: RackMappingHistory

  @Input()
  set row(row: RackMappingHistory) {
    this.element = row
    console.log(this.element)
  }

  constructor() { }

  ngOnInit() {
  }

}
