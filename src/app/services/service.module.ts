import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginService } from './login.service';
import { UserService } from './user.service';
import { HttpClientService } from '../asyncServices/http-client.service';

import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project.service';
import { AsideMenuService } from './aside-menu.service';
import { ChartLoaderService } from './chart-loader.service';
import { DevicesTreeService } from './devices.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        LoginService,
        UserService,
        HttpClientService,
        ProjectService,
        AsideMenuService,
        ChartLoaderService,
        DevicesTreeService
    ]
})
export class ServiceModule { }
