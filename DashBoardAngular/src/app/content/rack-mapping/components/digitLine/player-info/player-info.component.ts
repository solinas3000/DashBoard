import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RessourceHardware } from '../../../models/ressourceHardware.model';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  player: RessourceHardware;

  @Input()
  set RessourceHardwarePlayer(player: RessourceHardware) {
    this.player = player;
  }

  @Output('gotoRH') gotoRH: EventEmitter<RessourceHardware> = new EventEmitter<RessourceHardware>();

  @Output('openDialogChange') openDialogChange: EventEmitter<object> = new EventEmitter<object>();

  @Output('removePlayer') removePly: EventEmitter<RessourceHardware> = new EventEmitter<RessourceHardware>();

  get RessourceHardwarePlayer(): RessourceHardware {
    return this.player;
  }
  constructor() {}

  ngOnInit() {}

  gotoRHPlayer() {
    this.gotoRH.emit(this.player);
  }

  removePlayer() {
    this.removePly.emit(this.player)
  }

  openChange() {
    this.openDialogChange.emit({ type: 'Player', OLD_ID_RessourceHardware: this.player.ID_RessourceHardware });
  }
}
