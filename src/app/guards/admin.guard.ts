import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const role = userService.role;

  if (role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigate([ '/dashboard' ]);
    return false;
  }
};
