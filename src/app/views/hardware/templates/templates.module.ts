import { NgModule } from '@angular/core';

import { TemplatesComponent } from './templates.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplatesFilterPipe } from '../../../shared/pipe/filter-templates.pipe';
import { AppTemplatesModalComponent } from '../../../components/app-templates-modal/app-templates-modal.component';
import { ChartSharedModule } from '../../../shared/modules/chartShared.module';

@NgModule({
  imports: [
    TemplatesRoutingModule,
    CommonModule,
    FormsModule,
    ChartSharedModule
  ],
  declarations: [TemplatesComponent, TemplatesFilterPipe, AppTemplatesModalComponent]
})
export class TemplatesModule { }
