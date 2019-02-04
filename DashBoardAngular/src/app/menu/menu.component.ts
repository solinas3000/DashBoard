import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

  /**
   *
   * redirect to specific module via routerLink="/nameofmymodule"
   *
   */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  activeMenu: boolean
  @Input('activeMenu')
  set activeM(active: boolean) {
    this.activeMenu = active;
  }
  @Output('toggle') toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output('logout') logOff: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
  }

  toggleNav(){
    this.toggle.emit()
  }

  logout(){
    this.logOff.emit()
    this.toggle.emit()
  }

}
