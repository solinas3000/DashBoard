import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ApplicationPipesModule } from '../../pipes/applicationPipe.module';
import { RessourceHardwareCreationOpenCloseSnackComponent } from './components/createRH/ressource-hardware-creation-open-close-snack/ressource-hardware-creation-open-close-snack.component';
import { RessourceHardwareCreationComponent } from './components/createRH/ressource-hardware-creation/ressource-hardware-creation.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DoubleClickDialogComponent } from './components/double-click-dialog/double-click-dialog.component';
import { DialogChangeComponent } from './components/digitLine/dialog-change/dialog-change.component';
import { DialogAdd, ElementsComponent } from './components/digitLine/elements/elements.component';
import { LineInfoComponent } from './components/digitLine/line-info/line-info.component';
import { PlayerInfoComponent } from './components/digitLine/player-info/player-info.component';
import { RackInfoComponent } from './components/digitLine/rack-info/rack-info.component';
import { StructDigitLineComponent } from './components/digitLine/struct-digit-line/struct-digit-line.component';
import { DialogAddLineComponent } from './components/workSpace/dialog-add-line/dialog-add-line.component';
import { DigitLineWorkspComponent } from './components/workSpace/digit-line-worksp/digit-line-worksp.component';
import { RackWorkspComponent } from './components/workSpace/rack-worksp/rack-worksp.component';
import { StructWorkspaceComponent } from './components/workSpace/struct-workspace/struct-workspace.component';
import { ContentRhComponent } from './components/ressourceHard/content-rh/content-rh.component';
import { RessourceHardwareDetailComponent } from './components/ressourceHard/ressource-hardware-detail/ressource-hardware-detail.component';
import { RessourceHardwareGotoComponent } from './components/ressourceHard/ressource-hardware-goto/ressource-hardware-goto.component';
import { RessourceHardwareSearchLayoutComponent } from './components/ressourceHard/ressource-hardware-search-layout/ressource-hardware-search-layout.component';
import { WorkspStudioComponent } from './components/studio/worksp-studio/worksp-studio.component';
import { DialogNewStudio, DialogNewWorkSp, StructStudioComponent } from './components/studio/struct-studio/struct-studio.component';
import { TabContainerComponent } from './components/tabContainer/tab-container/tab-container.component';
import { MaterialModule } from './material.module';
import { SubStandbyPipe } from './pipes/sub-standby.pipe';
import { RackMappingRoutingModule } from './rack-mapping-routing.module';
import { LineDigitService } from './service/line-digit.service';
import { WorkspaceService } from './service/poste-de-travail.service';
import { RessourceHardwareService } from './service/ressource-hardware.service';
import { SharingVariableService } from './service/sharing-variable.service';
  /**
   *
   * Module For RackMapping Page
   *
   *
   */
@NgModule({
  declarations: [
    RessourceHardwareSearchLayoutComponent,
    RessourceHardwareDetailComponent,
    RessourceHardwareGotoComponent,
    RessourceHardwareCreationComponent,
    RessourceHardwareCreationOpenCloseSnackComponent,
    TabContainerComponent,
    StructWorkspaceComponent,
    DigitLineWorkspComponent,
    StructDigitLineComponent,
    LineInfoComponent,
    RackInfoComponent,
    PlayerInfoComponent,
    ElementsComponent,
    DialogAdd,
    DoubleClickDialogComponent,
    StructStudioComponent,
    WorkspStudioComponent,
    DialogNewStudio,
    DialogNewWorkSp,
    DialogAddLineComponent,
    DialogComponent,
    RackWorkspComponent,
    DialogChangeComponent,
    SubStandbyPipe,
    DialogAddLineComponent,
    DialogChangeComponent,
    ContentRhComponent
  ],
  imports: [
    ApplicationPipesModule,
    FormsModule,
    CommonModule,
    RackMappingRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DoubleClickDialogComponent,
    DialogComponent,
    DialogChangeComponent,
    DialogNewWorkSp,
    DialogNewStudio,
    DialogAdd,
    DialogAddLineComponent,
    RessourceHardwareCreationOpenCloseSnackComponent
  ],
  providers: [
    RessourceHardwareService,
    SharingVariableService,
    WorkspaceService,
    LineDigitService,
    SubStandbyPipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class RackMappingModule { }
