import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { IMenu } from '../../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {
  menuItems!: IMenu[];
  user!: User;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menuItems;

    if (this.userService.user) {
      this.user = this.userService.user;
    }
  }
}
