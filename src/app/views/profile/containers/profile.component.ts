import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { UserModel } from '../../../shared/models/user.model';

@Component({
    templateUrl: 'profile.component.html'
})
export class ProfileComponent {
    public user: UserModel

    constructor(private userService: UserService) {
        this.userService.getUser()
        .subscribe((data: UserModel) => {
            this.user = data
        }, error => {
            console.error('Cannot get user info')
        });
     }
}
