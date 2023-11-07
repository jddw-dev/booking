export class ContactsEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstname?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  jobName?: string | null;
  comments?: string | null;
}
