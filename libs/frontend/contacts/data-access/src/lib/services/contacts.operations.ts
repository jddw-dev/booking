import { gql } from 'apollo-angular';

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      name
    }
  }
`;
