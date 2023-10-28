import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uid: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ uid });
  }

  findOneBy(options: any): Promise<User | null> {
    return this.usersRepository.findOneBy(options);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(uid: string, user: User): Promise<User | null> {
    await this.usersRepository.update(uid, user);
    return this.usersRepository.findOneBy({ uid });
  }

  async remove(uid: string): Promise<void> {
    await this.usersRepository.delete(uid);
  }
}
