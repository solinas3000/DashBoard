import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DetailWorkspDynamicComponent } from './content/rack-mapping/components/workSpace/detail-worksp-dynamic/detail-worksp-dynamic.component';
import { GlobalSharingVariableService } from './global-service/global-sharing-variable.service';
import { RequestInterceptorService } from './global-service/request-interceptor.service';
import './rxjs-operators';
/**
 *
 * specific  module to import global dependencies related to every component of the app
 *
 */
@NgModule({
  imports: [HttpClientModule, CommonModule],
  declarations: [DetailWorkspDynamicComponent],
  providers: [RequestInterceptorService, GlobalSharingVariableService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DetailWorkspDynamicComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptorService,
          multi: true
        },
        GlobalSharingVariableService
      ]
    };
  }
}
