import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClientService } from '../asyncServices/http-client.service'
import { HttpHeaders } from '@angular/common/http'

import { UserStore } from '../store/user.store';

@Injectable()
export class LoginService {

    constructor(private http: HttpClientService, private router: Router, private user: UserStore) {
    }

    public login(username: string, password: string): Promise<any> {
        const customHeaders = new Map<string, string>();
        customHeaders.set('login', username);
        customHeaders.set('password', password);

        return this.http.get('/auth/token', null, customHeaders)
            .toPromise()
            .catch(err => {
                return null;
            });
    }

    public isLoggedIn(): boolean {
        return this.user.JWT ? true : false;
    }
}
