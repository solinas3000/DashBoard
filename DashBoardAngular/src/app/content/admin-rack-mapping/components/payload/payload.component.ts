import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
  /**
   *
   * component used to show the parsed data on the screen
   *
   *
   */
@Component({
  selector: 'app-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayloadComponent implements OnInit {
  element: any
  typeElt: string
  objectKeys = Object.keys;
  constructor() { }

  @Input()
  set content(content: string) {
    this.element = content.replace(/\W/g,' ')
    console.log(this.element)
  }

  @Input()
  set type(type: string) {
    this.typeElt = type
    console.log(this.typeElt)
  }

  ngOnInit() {
  }

}
