import { User } from '@angular/fire/auth';
import { customClaims } from '@angular/fire/auth-guard';
import { UserRole } from '@booking/frontend-shared-graphql';
import { map, pipe, switchMap } from 'rxjs';

export const userSpaceGuard = () =>
  pipe(
    switchMap(async (user: User | null) => {
      console.log('switchMap');

      if (!user) {
        console.log('no user');
        return null;
      }

      console.log('return transformed user');
      // Transform user to get idTokenResult
      return {
        user: user,
        idTokenResult: await user.getIdTokenResult(),
      };
    }),
    map((userInfos: any) => {
      console.log('userInfos: ');
      console.log(userInfos);

      // No user, redirect to login
      if (!userInfos?.user) {
        console.log('no user');
        return [`auth/login`];
      }

      // If user is admin, redirect to admin space
      const claims = userInfos.idTokenResult.claims;
      console.log('claims:');
      console.log(claims);
      if (claims && claims.role === UserRole.Admin) {
        console.log('return admin');
        return ['admin'];
      }

      console.log('return true');
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
