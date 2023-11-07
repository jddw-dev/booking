export class ContactEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstname?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  zipcode?: string | null;
  city?: string | null;
  type?: string | null;
  jobName?: string | null;
  comments?: string | null;
}
