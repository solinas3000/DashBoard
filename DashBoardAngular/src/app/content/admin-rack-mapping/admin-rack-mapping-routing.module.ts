import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructAdminComponent } from './components/struct-admin/struct-admin.component';

const routes: Routes = [
  {
    path: '',
    component: StructAdminComponent
  }
];
  /**
   *
   * Routing Module For Admin Rack Mapping Page / imported in app-routing.module.ts
   *
   *
   */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRackMappingRoutingModule { }
