import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
  exports: ['IUserService'],
})
export class UsersModule {}
