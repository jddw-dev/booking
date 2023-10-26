import { User } from '@booking/backend-users-data-access';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput, SocialRegisterInput } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async register(
    registerDto: RegisterInput | SocialRegisterInput
  ): Promise<User> {
    return this.usersRepository.save(registerDto);
  }
}
