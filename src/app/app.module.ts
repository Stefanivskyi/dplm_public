import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  AppShowTreeSensorComponent,
  AppShowTreeScComponent,
  AppShowTreeCcComponent,
  AppShowTreeProjectComponent,
  AppShowAsideStockComponent,
  AppShowPairedSensorComponent,
  AppShowPairedScComponent,
  AppShowPairedCcComponent
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  AppShowTreeSensorComponent,
  AppShowTreeScComponent,
  AppShowTreeCcComponent,
  AppShowTreeProjectComponent,
  AppShowAsideStockComponent,
  AppShowPairedSensorComponent,
  AppShowPairedScComponent,
  AppShowPairedCcComponent
]

import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]
import { ServiceModule } from './services/service.module';

import { AppRoutingModule } from './app.routing';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { StoreModule } from './store/store.module';
import { ProjectService } from './services/project.service';
import { RealtimeService } from './services/realtime.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ServiceModule,
    StoreModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  ProjectService,
  RealtimeService,
],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
