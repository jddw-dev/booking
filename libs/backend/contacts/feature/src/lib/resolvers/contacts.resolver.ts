import {
  Contact,
  ContactsService,
} from '@booking/backend-contacts-data-access';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query((returns) => [Contact])
  async contacts(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
}
