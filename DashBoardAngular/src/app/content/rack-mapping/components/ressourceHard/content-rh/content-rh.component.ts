import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RessourceHardware } from '../../../models/ressourceHardware.model';
  /**
   *
   * Component for the content of the selected hardware in the list
   *
   */
@Component({
  selector: 'app-content-rh',
  templateUrl: './content-rh.component.html',
  styleUrls: ['./content-rh.component.css']
})
export class ContentRhComponent implements OnInit {
  ressourceHardware: RessourceHardware

  constructor() { }

  @Input()
  set row(rh: RessourceHardware){
    this.ressourceHardware = rh
  }

  ngOnInit() {
  }

}
