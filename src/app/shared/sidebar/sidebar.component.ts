import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  menuItems: any[] = [];
  user!: User;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly userService: UserService,
  ) {
    this.menuItems = this.sidebarService.menuItems;

    if (this.userService.user) {
      this.user = this.userService.user;
    }
  }
}
