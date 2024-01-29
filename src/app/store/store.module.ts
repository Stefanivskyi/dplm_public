import { NgModule } from '@angular/core';
import { UserStore } from '../store/user.store';
import { MobxAngularModule } from 'mobx-angular';
import { LoginService } from '.././services/login.service';

@NgModule({
    imports: [
        MobxAngularModule
    ],
    providers: [
        UserStore,
        LoginService,
    ]
})
export class StoreModule {

}
