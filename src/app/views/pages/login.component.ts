import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

import { LoginService } from '../../services/login.service';
import { LoginModel } from '../../shared/models/login.model';
import { UserModel } from '../../shared/models/user.model';
import { UserStore } from '../../store/user.store';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  public isLoading: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private user: UserStore
  ) {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public async onSubmit(login: string, password: string) {
    const result = await this.loginService.login(login, password);

    if (result != null) {

      // save the acquired token into local storage
      this.saveToken(result);

      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Incorect Username or Password');
      this.isLoading = true;
    }
  }

  private saveToken(authResult) {
    if (authResult) {
      this.user.JWT = authResult.access_token;
      this.user.fullName = authResult.fullName;
    }
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  ngOnInit() {
    this.logout();
  }
}
