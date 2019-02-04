import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabContainerComponent } from './components/tabContainer/tab-container/tab-container.component';

const routes: Routes = [
  {
    path: '',
    component: TabContainerComponent
  }
];
  /**
   *
   * Routing Module For RackMapping Page
   *
   *
   */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RackMappingRoutingModule { }
