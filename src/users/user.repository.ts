import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
  findOne(options: any): Promise<User | null>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async findOne(options: any): Promise<User | null> {
    return this.userRepo.findOne(options);
  }

  async delete(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
