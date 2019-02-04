import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalSharingVariableService } from './global-sharing-variable.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
  /**
   *
   * Basic Authentication service
   *
   *
   */
@Injectable()
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: GlobalSharingVariableService, private tokenService: TokenService, private router: Router) {}

  attemptAuth(username: string, password: string) {
    const uri = this.globals.getURL() + 'attemptAuth'
    const credentials = { username: username, password: password };
    const body = JSON.stringify(credentials);
    this.http.post<any>(encodeURI(uri), body, this.httpOptions).shareReplay().subscribe(
      data => {
        this.tokenService.saveToken(data.auth_token);
        this.globals.changeActiveMenu(true)
        this.router.navigate(['rackMapping']);
      }
    );
  }
}
