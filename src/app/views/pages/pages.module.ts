import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MobxAngularModule } from 'mobx-angular';
import { StoreModule } from '../../store/store.module';

@NgModule({
  imports: [ PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MobxAngularModule,
    StoreModule
],
  declarations: [
    LoginComponent
  ]
})
export class PagesModule { }
