import { PaginatedResults } from '@booking/frontend-pagination-data-access';
import { createActionGroup, props } from '@ngrx/store';
import { ContactEntity } from './contacts.models';

export const ContactsCrudActions = createActionGroup({
  source: 'Contacts/Crud',
  events: {
    'Get Contacts': props<{
      page: number;
      perPage?: number;
      search?: string;
    }>(),
    'Get Contacts Success': props<{
      datas: PaginatedResults<ContactEntity>;
    }>(),
    'Get Contacts Failure': props<{ error: any }>(),
    'Get Contact': props<{ id: string }>(),
    'Get Contact Success': props<{ contact: ContactEntity }>(),
    'Get Contact Failure': props<{ error: any }>(),
  },
});
