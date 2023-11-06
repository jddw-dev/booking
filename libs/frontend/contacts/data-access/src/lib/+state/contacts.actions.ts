import { createActionGroup, props } from '@ngrx/store';
import { ContactsDatas } from './contacts.models';

export const ContactsCrudActions = createActionGroup({
  source: 'Contacts/Crud',
  events: {
    'Get Contacts': props<{ page: number; perPage?: number }>(),
    'Get Contacts Success': props<{ datas: ContactsDatas }>(),
    'Get Contacts Failure': props<{ error: any }>(),
  },
});
