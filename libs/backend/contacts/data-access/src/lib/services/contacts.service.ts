import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact';

@Injectable()
export class ContactsService {
  private logger: Logger = new Logger(ContactsService.name);

  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findOne(id: string): Promise<Contact | null> {
    return this.contactRepository.findOneBy({ id });
  }

  async create(input: Partial<Contact>): Promise<Contact> {
    return this.contactRepository.save(input);
  }

  async createMany(contacts: Partial<Contact>[]): Promise<Contact[]> {
    return this.contactRepository.save(contacts);
  }

  async update(id: string, input: Contact): Promise<Contact> {
    const contact = await this.findOne(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return this.contactRepository.save({ ...contact, ...input });
  }

  async delete(id: string): Promise<void> {
    const contact = await this.findOne(id);
    if (contact) {
      await this.contactRepository.remove(contact);
    }
  }

  async getContactsCount(): Promise<number> {
    return this.contactRepository.count();
  }
}
