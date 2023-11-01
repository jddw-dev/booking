import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import {
  MeGQL,
  MeQuery,
  RegisterFromSocialGQL,
  RegisterGQL,
} from '@booking/frontend-shared-graphql';
import { UserCredential, signInWithEmailAndPassword } from '@firebase/auth';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    @Optional() private auth: Auth,
    private meGql: MeGQL,
    private registerGql: RegisterGQL,
    private registerFromSocialGql: RegisterFromSocialGQL,
    private apollo: Apollo
  ) {}

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    await signOut(this.auth);
  }

  // register(email: string, password: string): Observable<any> {
  //   return this.registerGql
  //     .mutate<MutationRegisterArgs>({
  //       mutation: RegisterMutation,
  //       variables: {
  //         email,
  //         password,
  //       },
  //     })
  //     .pipe(map((result) => result.data.register));
  // }

  // registerFromSocial(uid: string, email: string): Observable<any> {
  //   return this.apollo
  //     .mutate<any>({
  //       mutation: authOperations.registerFromSocialMutation,
  //       variables: {
  //         uid,
  //         email,
  //       },
  //     })
  //     .pipe(map((result) => result.data.registerFromSocial));
  // }

  me(): Observable<MeQuery['me']> {
    return this.meGql.watch().valueChanges.pipe(
      map((result) => {
        return result.data.me;
      })
    );
  }

  async getCurrentUser(): Promise<User | null> {
    return this.auth.currentUser;
  }
}
