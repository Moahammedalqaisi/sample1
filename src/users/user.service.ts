import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import type { IUserRepository } from './user.repository';

export interface IUserService {
  create(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updateData: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
  private readonly saltRounds = 10;

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    if (!user.email) throw new BadRequestException('Invalid email address');
    //check if the email is exists
    const isFound = await this.userRepository.findByEmail(user?.email);
    if (isFound) throw new BadRequestException('Email already exists');

    // Hash the password before saving
    // if (user.password) {
    //   const salt = await bcrypt.genSalt(this.saltRounds);
    //   const hash = await bcrypt.hash(user.password, salt);

    //   //user.password = await bcrypt.hash(user.password, this.saltRounds);
    //   user.password = hash;
    // }
    return this.userRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: +id } });
    if (!user) return null;

    if (updateData.email !== user.email) {
      const isFound = await this.userRepository.findByEmail(user?.email);
      if (isFound) throw new BadRequestException('Email already exists');
    }

    // Hash the password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        this.saltRounds,
      );
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting expense with id: ${id}`);
    await this.userRepository.delete(id);
  }
}
