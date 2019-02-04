import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { RequestInterceptorService } from '../global-service/request-interceptor.service';
  /**
   *
   * Component used to show progress bar on any network activity / work automaticaly, see requestInterceptorService
   *
   *
   */
@Component({
  selector: 'app-http-progress-bar',
  templateUrl: './http-progress-bar.component.html',
  styleUrls: ['./http-progress-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpProgressBarComponent implements OnInit {

  mode: string
  @Input('show')
  set activeM(show: boolean) {
    console.log(show)
    if(show){
      this.mode = "indeterminate"
    }else{
      this.mode = "determinate"
    }
  }

  constructor() {}

  ngOnInit() {
  }

}
