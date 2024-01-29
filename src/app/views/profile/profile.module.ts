import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserStore } from '../../store/user.store';
import { CommonModule } from '@angular/common';

// Containers
import { ProfileComponent } from './containers/profile.component';

// Components
import { ProfileInfoComponent } from '../../views/profile/components/profile-info.component'

@NgModule({
    imports: [ProfileRoutingModule,
            CommonModule],
    declarations: [
        ProfileComponent,
        ProfileInfoComponent
    ],
    providers: [
        UserStore
    ]
})
export class ProfileModule {

}
