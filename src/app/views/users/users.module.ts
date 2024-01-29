import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';



@NgModule({
    imports: [
        UsersRoutingModule,
        ChartsModule
    ],
    declarations: [UsersComponent]
})
export class UsersModule { }
