import { observable, action, computed } from 'mobx-angular';
import { Injectable } from '@angular/core'
import { LoginModel } from '../shared/models/login.model';
import { Observable } from 'rxjs';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UserStore {
    @observable user: UserModel[] = [];

    readonly tokenKey = 'access_token';
    readonly fullNameKey = 'user::fullName';

    constructor(private userService: UserService) {}

    @action public getUser() {
        return this.userService.getUser()
    }

    get JWT() {
      return localStorage.getItem(this.tokenKey);
    }

    set JWT(token: string) {
      localStorage.setItem(this.tokenKey, token);
    }

    public removeToken() {
      localStorage.removeItem(this.tokenKey);
    }

    get fullName() {
      return localStorage.getItem(this.fullNameKey);
    }

    set fullName(name: string) {
      localStorage.setItem(this.fullNameKey, name);
    }
}
