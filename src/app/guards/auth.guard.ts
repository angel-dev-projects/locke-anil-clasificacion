import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../shared/data-access/auth-state.service';
import { map } from 'rxjs';

// This guard checks if the user is authenticated and redirects them to the sign-in page if they are not
export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        console.log(state);
        if (!state) {
          router.navigateByUrl('/auth/sign-in');
          return false;
        }

        return true;
      })
    );
  };
};

// This guard checks if the user is authenticated and redirects them to the standings page if they are
export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
      map((state) => {
        if (state) {
          router.navigateByUrl('/standings');
          return false;
        }

        return true;
      })
    );
  };
};
