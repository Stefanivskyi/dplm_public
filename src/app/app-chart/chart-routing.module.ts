import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './containers/chart.component';

const routes: Routes = [
    {
        path: '',
        component: ChartComponent,
        data: {
        title: 'Charts'
        }
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule {}
