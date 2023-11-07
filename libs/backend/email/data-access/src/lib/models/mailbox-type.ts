import { registerEnumType } from '@nestjs/graphql';

export enum MailboxType {
  GMAIL = 'gmail',
}

registerEnumType(MailboxType, { name: 'MailboxType' });
