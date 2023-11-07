import { PaginatedResults } from '@booking/frontend-pagination-data-access';
import { createActionGroup, props } from '@ngrx/store';
import { ContactsEntity } from './contacts.models';

export const ContactsCrudActions = createActionGroup({
  source: 'Contacts/Crud',
  events: {
    'Get Contacts': props<{ page: number; perPage?: number }>(),
    'Get Contacts Success': props<{
      datas: PaginatedResults<ContactsEntity>;
    }>(),
    'Get Contacts Failure': props<{ error: any }>(),
  },
});
