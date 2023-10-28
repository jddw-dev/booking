import { User } from '@angular/fire/auth';
import { customClaims } from '@angular/fire/auth-guard';
import { UserRole } from '@booking/frontend-shared-graphql';
import { map, pipe, switchMap } from 'rxjs';

// Prevent access to auth page for logged in users
export const authPagesGuard = () =>
  pipe(
    switchMap(async (user: User | null) => {
      if (user) {
        return [''];
      }

      return true;
    })
  );

/**
 * Prevent access to user space if user is not logged in
 * Redirect to admin if user has role Admin
 */
export const userSpaceGuard = () =>
  pipe(
    switchMap(async (user: User | null) => {
      if (!user) {
        return null;
      }

      // Transform user to get idTokenResult
      return {
        user: user,
        idTokenResult: await user.getIdTokenResult(),
      };
    }),
    map((userInfos: any) => {
      // No user, redirect to login
      if (!userInfos?.user) {
        return [`auth/login`];
      }

      // If user is admin, redirect to admin space
      const claims = userInfos.idTokenResult.claims;

      if (claims && claims.role === UserRole.Admin) {
        return ['admin'];
      }

      return true;
    })
  );

export const adminOnlyGuard = () =>
  pipe(
    customClaims,
    map((claims) => {
      if (claims.role === UserRole.Admin) {
        return true;
      }

      return ['admin'];
    })
  );
