import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'rackMapping',
    loadChildren: 'app/content/rack-mapping/rack-mapping.module#RackMappingModule'
  },
  {
    path: 'adminRackMapping',
    
    loadChildren: 'app/content/admin-rack-mapping/admin-rack-mapping.module#AdminRackMappingModule'
  },
  {
    path: 'log',
    loadChildren: 'app/content/log/log.module#LogModule'
  },
  {
    path: '',
    redirectTo: 'log',
    pathMatch: 'full'
  }
];
  /**
   *
   * principal router module / put your other router module relative to your created module here, so angular could register them and lazy load correctly
   *
   */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
