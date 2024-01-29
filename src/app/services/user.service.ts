import { Injectable } from '@angular/core';
import { HttpClientService } from '../asyncServices/http-client.service';
import { UserModel } from '../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private http: HttpClientService) {}

    public getUser() {
        const token = new Map<string, string>();
        return this.http.get('/user', null, token);
    }

}
