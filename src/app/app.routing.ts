
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ProjectService } from './services/project.service';

import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { path } from 'd3';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: FullLayoutComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'chart/:id',
                loadChildren: './components/app-custom-chart/custom-chart.module#CustomChartModule'
            },
            {
                path: 'devices-tree/:id',
                loadChildren: './views/project-devices-tree/project-devices-tree.module#ProjectDevicesTreeModule'
            },
            {
                path: 'profile',
                loadChildren: './views/profile/profile.module#ProfileModule'
            },
            {
                path: 'paired',
                loadChildren: './views/hardware/paired-devices/paired-devices.module#PairedDevicesModule'
            },
            {
                path: 'cloud-connects/:id',
                loadChildren: './components/app-cloud-connects/cloud-connects.module#CloudConnectsModule',

            },
            {
                path: 'stock',
                loadChildren: './views/hardware/stock/stock.module#StockModule'
            },
            {
                path: 'templates',
                loadChildren: './views/hardware/templates/templates.module#TemplatesModule'
            },
            {
                path: 'all-devices',
                loadChildren: './views/devices-tree/devices-tree.module#DevicesTreeModule'
            }
       ],
    }, {
        path: '',
        component: SimpleLayoutComponent,
        children: [
        {
            path: '',
            loadChildren: './views/pages/pages.module#PagesModule',
        }
        ]
    }
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {}
