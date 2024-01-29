import { Injectable } from '@angular/core';

import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { UserStore } from '../store/user.store';

@Injectable()
export class AuthGuard {

    constructor(private router: Router, private user: UserStore) { }

    public canActivate() {
        if (this.user.JWT) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

