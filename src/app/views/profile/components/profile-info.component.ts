import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '../../../shared/models/user.model'

@Component({
    selector: 'app-profile-info',
    templateUrl: 'profile-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoComponent {
    @Input() user: UserModel
}
