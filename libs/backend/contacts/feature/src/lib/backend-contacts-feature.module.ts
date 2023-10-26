import { BackendContactsDataAccessModule } from '@booking/backend/contacts/data-access';
import { Module } from '@nestjs/common';
import { ContactsResolver } from './resolvers/contacts.resolver';

@Module({
  imports: [BackendContactsDataAccessModule],
  controllers: [],
  providers: [ContactsResolver],
  exports: [ContactsResolver],
})
export class BackendContactsFeatureModule {}
