import { GetUser } from '@booking/backend-auth-feature';
import {
  Contact,
  ContactCreateDto,
  ContactsService,
} from '@booking/backend-contacts-data-access';
import { User } from '@booking/backend-users-data-access';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query((returns) => [Contact])
  async contacts(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  @Mutation((returns) => Contact)
  async createContact(
    @Args('contactCreateDto') contactCreateDto: ContactCreateDto
  ): Promise<Contact> {
    return this.contactsService.create(contactCreateDto);
  }

  @Mutation((returns) => [Contact])
  async createContacts(
    @Args({ name: 'contactCreateDtos', type: () => [ContactCreateDto] })
    contactCreateDtos: ContactCreateDto[],
    @GetUser() user: User
  ): Promise<Contact[]> {
    return this.contactsService.createMany(
      contactCreateDtos.map((dto) => {
        return {
          ...dto,
          owner: user,
        };
      })
    );
  }
}
