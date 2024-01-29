import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    data: {
      title: 'Stock'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {}
