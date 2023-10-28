import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Contact = {
  __typename?: 'Contact';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  registerFromSocial: User;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRegisterFromSocialArgs = {
  registerInput: SocialRegisterInput;
};

export type Query = {
  __typename?: 'Query';
  contacts: Array<Contact>;
  me: User;
  version: Scalars['String']['output'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SocialRegisterInput = {
  email: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createDate: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  uid: Scalars['String']['output'];
  updateDate: Scalars['DateTime']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', uid: string, email: string, role: UserRole } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', uid: string, email: string, role: UserRole, createDate: any, updateDate: any } };

export type RegisterFromSocialMutationVariables = Exact<{
  uid: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterFromSocialMutation = { __typename?: 'Mutation', registerFromSocial: { __typename?: 'User', uid: string, email: string, role: UserRole, createDate: any, updateDate: any } };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', id: string, name: string }> };

export const MeDocument = gql`
    query Me {
  me {
    uid
    email
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    override document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(registerInput: {email: $email, password: $password}) {
    uid
    email
    role
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    override document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterFromSocialDocument = gql`
    mutation RegisterFromSocial($uid: String!, $email: String!) {
  registerFromSocial(registerInput: {uid: $uid, email: $email}) {
    uid
    email
    role
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterFromSocialGQL extends Apollo.Mutation<RegisterFromSocialMutation, RegisterFromSocialMutationVariables> {
    override document = RegisterFromSocialDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ContactsDocument = gql`
    query Contacts {
  contacts {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ContactsGQL extends Apollo.Query<ContactsQuery, ContactsQueryVariables> {
    override document = ContactsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }