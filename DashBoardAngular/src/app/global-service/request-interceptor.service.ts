import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { GlobalSharingVariableService } from "./global-sharing-variable.service";
import { TokenService } from "./token.service";
  /**
   *
   * As the name sugest, intercept all requests sended and received / You can append options to any request or catch specific one here
   *
   *
   */
@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  spinnerActive: number = 0;

  constructor(
    private globalSharingVariableService: GlobalSharingVariableService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let headers = req.headers.set("Authorization", "Bearer " + this.tokenService.getToken())
    req = req.clone({ headers });

    console.log(req);
    this.spinnerActive++;
    if (this.spinnerActive == 1)
      this.globalSharingVariableService.changeShowSpinner(true);
    return next
      .handle(req)
      .do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event);
            this.spinDecrement()
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.log('CATCH ERROR')
            console.log(error)
            this.spinDecrement()
            if(error.status === 401){
              this.tokenService.signOut()
              this.router.navigate(['log']);
            }
            this.globalSharingVariableService.changeError(error.error)
          }
        }
      );
  }

  spinDecrement() {
    this.spinnerActive--;
    if (this.spinnerActive == 0)
      this.globalSharingVariableService.changeShowSpinner(false);
  }

}
