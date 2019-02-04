import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ComponentFactoryService } from './global-service/component-factory.service';
import { GlobalSharingVariableService } from './global-service/global-sharing-variable.service';
import { TokenService } from './global-service/token.service';
  /**
   *
   * head of the DOM Tree / root of the app
   *
   */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  activeMenu: Observable<boolean>;
  showSpinner: Observable<boolean> = new Observable;
  target: any;
  opened: boolean = false
  mobileQuery: MediaQueryList;
  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  private _mobileQueryListener: () => void;
  constructor(
    private componentFactoryService: ComponentFactoryService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private globalSharingVariableService: GlobalSharingVariableService,
    private tokenService: TokenService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.showSpinner = this.globalSharingVariableService.getshowSpinnerasOb();
    this.componentFactoryService.setRootViewContainerRef(this.viewContainerRef);
    this.globalSharingVariableService.getOpenEndSideNavAsOb().subscribe(res => {
      this.closeEndSideNav()
      this.componentFactoryService.addDynamicComponent(res);
      this.openEndSideNav()
    });
    this.activeMenu = this.globalSharingVariableService.getActiveMenuAsOb();
  }


  openEndSideNav() {
      this.opened = true
  }

  closeEndSideNav() {
    this.opened = false
  }

  ngAfterViewInit(): void {
    this.globalSharingVariableService.getScrollTOAsOb().subscribe(y => {
      this.target.scrollTo(0, y);
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  scrollEvent(event) {
    this.target = event;
    this.globalSharingVariableService.changeScrollTopValue(event.scrollTop);
  }

  logout() {
    this.tokenService.signOut()
    this.globalSharingVariableService.changeActiveMenu(false)
  }
}
