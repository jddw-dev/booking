import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email, Mailbox } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Mailbox, Email])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class BackendEmailDataAccessModule {}
