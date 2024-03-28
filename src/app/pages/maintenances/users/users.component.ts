import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import {
  ModalImageService,
  SearchesService,
  ToasterService,
  UserService,
} from '../../../services';
import { IDataDocumentModel } from '../../../interfaces';
import { Subscription, defer, from, map, switchMap } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnDestroy {
  users: User[] = [];
  usersTemp: User[] = [];
  isLoading: boolean = false;
  totalUsers: number = 0;
  pageFrom: number = 0;
  pageSize: number = 5;
  updateImageSubcription!: Subscription;

  constructor(
    private readonly userService: UserService,
    private readonly searchesService: SearchesService,
    private readonly toasterService: ToasterService,
    private readonly modalImageService: ModalImageService
  ) {
    this.updateImageSubcription = this.onChangesImageUpdate();
  }

  ngOnDestroy(): void {
    this.updateImageSubcription.unsubscribe();
  }

  onChangesImageUpdate(): Subscription {
    return this.modalImageService.updateImg$
      .subscribe(() => {
        this.loadUsers();
      });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.loadUsers(this.pageFrom, this.pageSize, 500)
      .subscribe(({ users, total }) => {
        this.users = users;
        this.totalUsers = total;
        this.isLoading = false;
      });
  }

  upateRole(user: User) {
    if (user.role) {
      this.userService.updateRoleUser(user.uid!, user.name, user.email, user.role)
        .subscribe({
          next: () => {
            this.loadUsers();
          },
          error: () => {
            this.toasterService.error('Error', 'Role not updated');
          }
        });
    }
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.user.uid) {
      this.toasterService.error('Error', 'You can not delete yourself');
      return;
    }
    const res = this.toasterService.questionWithConfirmAndClose(
      'User deleted',
      `We miss you ${user.name}!`, 'User');
    from(defer(() => res))
      .pipe(
        switchMap((isDeleted: boolean) => {
          if (isDeleted && user.uid) {
            return this.userService.deleteUser(user.uid);
          } else {
            return from([ false ]);
          }
        })
      ).subscribe(() => {
        this.loadUsers();
      });
  }

  openModal(user: User) {
    if (!user.uid) return;
    this.modalImageService.openModal('users', user.uid);
  }

  changePage(value: number): void {
    this.pageFrom += value;
    if (this.pageFrom < 0) {
      this.pageFrom = 0;
    } else if (this.pageFrom > this.totalUsers) {
      this.pageFrom = value;
    } else {
      this.loadUsers();
      return;
    }
  }

  search(termToSearch: string): void {
    if (termToSearch.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this.isLoading = true;
    this.searchesService
      .searchUsersByAnything(termToSearch, 'users')
      .pipe(
        map((res: IDataDocumentModel) => {
          if (res.data.length > 0) {
            const item = res.data[ 0 ];
            if (this.isUser(item)) {
              return res.data as User[];
            } else {
              return [];
            }
          } else {
            return [];
          }
        }),
      )
      .subscribe({
        next: (users) => {
          this.isLoading = false;
          if (users.length > 0) {
            this.users = users;
            this.usersTemp = users;
            this.totalUsers = users.length;
          } else {
            this.users = [];
            this.totalUsers = 0;
          }
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  isUser(data: any): data is User {
    return 'name' in data &&
      'email' in data &&
      'role' in data &&
      'status' in data &&
      'google' in data &&
      'uid' in data;
  }
}
