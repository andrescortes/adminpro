import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  user!: User;

  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router,
  ) {

    if (this._userService.user) {
      this.user = this._userService.user;
    }
  }

  logout() {
    this._userService.logout();
    this._router.navigateByUrl('/login');
  }

  onSubmit(termToSearch: string) {
    if (termToSearch.length === 0) {
      this._router.navigate([ 'dashboard' ]);
    } else {
      this._router.navigate([ 'dashboard/search', termToSearch ]);
    }
  }

}
