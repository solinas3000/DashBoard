import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/compiler/src/core';
import { TokenService } from './token.service';

  /**
   *
   * Service to handle all variables relative to the global application / just import this service in your component to use all this variables /
   * subcribe to the variable via getVariableAsOb().subscribe(variable => this.myVariable = variable) / change them via changeVariable(myNewValue: any)
   *
   *
   */
@Injectable()
export class GlobalSharingVariableService {
  constructor(private tokenService: TokenService) {}
  //urlApi: string = 'http://10.246.1.171:90/';
  //urlApi: string = 'http://10.246.1.185:90/'; // back end prod machine julien
  private urlApi: string = 'http://localhost:5000/'; // back end dev flask
  //urlApi: string = 'http://10.243.15.1:9070/';
  //urlApi: string = 'http://192.168.99.100:9005/'
  infoSnackBarSubject = new Subject<string>();
  errorMessageSubject = new Subject<any>();
  private activeMenu = new BehaviorSubject<boolean>(this.tokenService.getToken() ? true : false);
  private showSpinner = new BehaviorSubject<boolean>(false);
  private scrollTopValue = new Subject<number>();
  private scrollTo = new Subject<number>();
  private openEndSideNav = new Subject<any>();
  
  getURL() {
    return this.urlApi;
  }
  changeError(error: any) {
    this.errorMessageSubject.next(error);
  }

  getErrorAsOb(): Observable<any> {
    return this.errorMessageSubject.asObservable();
  }

  changeInfoSnackBar(infoSnackBar: string) {
    this.infoSnackBarSubject.next(infoSnackBar);
  }

  changeShowSpinner(mes: boolean) {
    this.showSpinner.next(mes);
  }

  getshowSpinnerasOb(): Observable<boolean> {
    return this.showSpinner.asObservable();
  }

  changeActiveMenu(mes: boolean) {
      this.activeMenu.next(mes);
  }

  getActiveMenuAsOb(): Observable<boolean> {
    return this.activeMenu.asObservable();
  }

  changeScrollTopValue(scrollTop: number) {
    this.scrollTopValue.next(scrollTop);
  }

  getScrollTopValueAsOb(): Observable<number> {
    return this.scrollTopValue.asObservable().debounceTime(100);
  }

  changeScrollTO(scrollTop: number) {
    this.scrollTo.next(scrollTop);
  }

  getScrollTOAsOb(): Observable<number> {
    return this.scrollTo.asObservable();
  }

  changeOpenEndSideNav(res) {
    this.openEndSideNav.next(res);
  }

  getOpenEndSideNavAsOb(): Observable<Component> {
    return this.openEndSideNav.asObservable();
  }
}
