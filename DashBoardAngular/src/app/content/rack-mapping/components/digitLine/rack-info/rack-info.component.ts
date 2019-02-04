import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RessourceHardware } from '../../../models/ressourceHardware.model';

@Component({
  selector: 'app-rack-info',
  templateUrl: './rack-info.component.html',
  styleUrls: ['./rack-info.component.css']
})
export class RackInfoComponent implements OnInit {
  rack: RessourceHardware;

  @Input()
  set RessourceHardwareRack(rack: RessourceHardware) {
    this.rack = rack;
  }

  @Output('gotoRH')
  gotoRH: EventEmitter<RessourceHardware> = new EventEmitter<RessourceHardware>();

  get RessourceHardwareRack(): RessourceHardware { return this.rack; }

  constructor() { }

  ngOnInit() {
  }

  gotoRHRack() {
    this.gotoRH.emit(this.rack);
  }

  openDialogChange() {

  }

}
