import { NgModule } from '@angular/core';

import {MatAccordion} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule } from '@angular/material/toolbar'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
  /**
   *
   * Use this module to import all modules related to Material Angular, this module is imported in rack-mapping.module.ts
   *
   *
   */
@NgModule({
  imports: [
    CdkTableModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    CdkTableModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
