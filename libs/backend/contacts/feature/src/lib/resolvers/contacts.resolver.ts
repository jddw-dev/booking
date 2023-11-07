import { GetUser } from '@booking/backend-auth-feature';
import {
  Contact,
  ContactCreateDto,
  ContactsService,
  FetchContactsArgs,
} from '@booking/backend-contacts-data-access';
import { User } from '@booking/backend-users-data-access';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query(() => Number, { name: 'contactsCount' })
  async getCount(): Promise<number> {
    return this.contactsService.count();
  }

  @Query(() => [Contact], { name: 'contacts' })
  async findAll(@Args() args: FetchContactsArgs): Promise<Contact[]> {
    return this.contactsService.findAll(args);
  }

  @Query(() => Contact, { name: 'contact' })
  async findOne(@Args('id') id: string): Promise<Contact | null> {
    return this.contactsService.findOne(id);
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
