import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router,
  ) { }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/login');
  }

}
