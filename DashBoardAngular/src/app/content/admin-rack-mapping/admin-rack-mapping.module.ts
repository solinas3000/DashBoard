import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRackMappingRoutingModule } from './admin-rack-mapping-routing.module';
import { StructAdminComponent } from './components/struct-admin/struct-admin.component';
import { RackMappingHistoryService } from './service/rack-mapping-history.service';
import { RackMappingHistoryComponent } from './components/rack-mapping-history/rack-mapping-history.component';
import { MaterialModule } from './material.module';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { PayloadComponent } from './components/payload/payload.component';
import { ApplicationPipesModule } from '../../pipes/applicationPipe.module';
  /**
   *
   * Module For Admin Rack Mapping Page
   *
   *
   */
@NgModule({
  imports: [CommonModule, AdminRackMappingRoutingModule, MaterialModule, ApplicationPipesModule],
  declarations: [StructAdminComponent, RackMappingHistoryComponent, ContentDetailComponent, PayloadComponent],
  providers: [RackMappingHistoryService]
})
export class AdminRackMappingModule {}
