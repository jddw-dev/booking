import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact';
import { ContactsService } from './services/contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactsService],
  exports: [TypeOrmModule, ContactsService],
})
export class BackendContactsDataAccessModule {}
