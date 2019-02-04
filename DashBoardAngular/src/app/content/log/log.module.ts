import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { LogRoutingModule } from './log-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
  /**
   *
   * Module for Login Page
   *
   *
   */
@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    MaterialModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [LoginComponent]
})
export class LogModule { }
