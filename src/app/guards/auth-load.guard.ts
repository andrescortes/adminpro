import { CanMatchFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

import { UserService } from '../services';

export const authLoadGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.validateToken()
    .pipe(
      tap((isValid) => {
        if (!isValid) {
          router.navigate([ '/login' ]);
        }
      })
    );
};
