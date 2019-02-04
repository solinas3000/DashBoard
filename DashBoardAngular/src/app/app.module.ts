import { MediaMatcher } from "@angular/cdk/layout";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core.module";
import { ErrorDialog, ErrorMessageComponent } from './error-message/error-message.component';
import { AuthService } from './global-service/auth.service';
import { ComponentFactoryService } from './global-service/component-factory.service';
import { RequestInterceptorService } from "./global-service/request-interceptor.service";
import { TokenService } from "./global-service/token.service";
import { HttpProgressBarComponent } from "./http-progress-bar/http-progress-bar.component";
import { InfoComponent, SnackInfoComponent } from "./info/info.component";
import { MenuComponent } from './menu/menu.component';
  /**
   *
   * racine module of the app
   *
   */
@NgModule({
  declarations: [AppComponent, InfoComponent, HttpProgressBarComponent, ErrorMessageComponent, ErrorDialog, MenuComponent, SnackInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    CoreModule.forRoot()
  ],
  providers: [
    RequestInterceptorService,
    MediaMatcher,
    ComponentFactoryService,
    AuthService,
    TokenService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [
    ErrorDialog,
    SnackInfoComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
