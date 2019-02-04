import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
  /**
   *
   * Use this module to import all modules related to Material Angular, this module is imported in log.module.ts
   *
   *
   */
@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
