import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  userName = this.user.fullName;
  pageHeaderPath = 'test_path';

  constructor(private router: Router, private user: UserStore) { }

  public logout() {
    this.user.removeToken();
    this.router.navigate(['/login'])
  }
}
