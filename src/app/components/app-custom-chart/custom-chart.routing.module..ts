import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomChartComponent } from './custom-chart.component';

const routes: Routes = [
    {
        path: '',
        component: CustomChartComponent,
        data: {
        title: 'Custom Chart'
        }
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule {}
